
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { User, Language, Post, Comment, PostCategory, AppView, Translations } from './types';
import { APP_TITLE, DEFAULT_LANGUAGE, UI_TEXTS, POST_CATEGORIES, Icons } from './constants';
import { LoginScreen, CreatePostForm, PostCard, SettingsPanel, Modal, Button, FilterPanel } from './components';

// Helper for localStorage
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((prevState: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      // Check if the value is a function and if so, call it with the previous state
      const valueToStore = typeof value === 'function'
        ? (value as (prevState: T) => T)(storedValue)
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

// Contexts
interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  isSimplifiedMode: boolean;
  toggleSimplifiedMode: () => void;
  posts: Post[];
  addPost: (postData: Omit<Post, 'id' | 'userId' | 'userName' | 'timestamp' | 'comments' | 'rsvp'>) => void;
  addCommentToPost: (postId: string, text: string) => void;
  currentView: AppView;
  setView: (view: AppView) => void;
  selectedPostId: string | null;
  setSelectedPostId: (postId: string | null) => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  exportPostsAsJson: () => void;
  userLocation: string | null;
  detectUserLocation: () => void;
  updatePostRsvp: (postId: string, status: 'coming' | 'not_coming') => void;
}

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};


const App: React.FC = () => {
  const [currentUser, setCurrentUserInternal] = useLocalStorage<User | null>('virtuaalne-naabrivalve-user', null);
  const [lang, setLangInternal] = useLocalStorage<Language>('virtuaalne-naabrivalve-lang', DEFAULT_LANGUAGE);
  const [isSimplifiedMode, setIsSimplifiedModeInternal] = useLocalStorage<boolean>('virtuaalne-naabrivalve-simplified', false);
  const [posts, setPostsInternal] = useLocalStorage<Post[]>('virtuaalne-naabrivalve-posts', []);
  const [currentView, setViewInternal] = useState<AppView>(currentUser ? 'feed' : 'login');
  const [selectedPostId, setSelectedPostIdInternal] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabledInternal] = useLocalStorage<boolean>('virtuaalne-naabrivalve-notifications', true);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // Filter states
  const [filterCategory, setFilterCategory] = useState<PostCategory | 'all'>('all');
  const [filterLocation, setFilterLocation] = useState<string>('');


  const t = useCallback((key: string, replacements?: Record<string, string>): string => {
    const entry = UI_TEXTS[key];
    if (!entry) return key;
    let text = entry[lang] || entry[Language.ET] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        text = text.replace(`{${placeholder}}`, value);
      });
    }
    return text;
  }, [lang]);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserInternal(user);
    if (!user) setViewInternal('login');
  };
  const setLang = (newLang: Language) => setLangInternal(newLang);
  const toggleSimplifiedMode = () => setIsSimplifiedModeInternal(prev => !prev);
  const setView = (view: AppView) => {
    setViewInternal(view);
    if (view !== 'postDetail') setSelectedPostIdInternal(null); // Reset selected post if not going to detail view
  }
  const setSelectedPostId = (postId: string | null) => {
    setSelectedPostIdInternal(postId);
    if(postId) setViewInternal('postDetail');
  }
  
  const toggleNotifications = () => setNotificationsEnabledInternal(prev => !prev);

  const addPost = (postData: Omit<Post, 'id' | 'userId' | 'userName' | 'timestamp' | 'comments' | 'rsvp'>) => {
    if (!currentUser) return;
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      timestamp: Date.now(),
      comments: [],
      rsvp: postData.category === PostCategory.EVENT ? [] : undefined,
    };
    setPostsInternal(prevPosts => [newPost, ...prevPosts]);
    setShowCreatePostModal(false); // Close modal after posting
    setView('feed');
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      text,
      timestamp: Date.now(),
    };
    setPostsInternal(prevPosts =>
      prevPosts.map(p =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
  };
  
  const updatePostRsvp = (postId: string, status: 'coming' | 'not_coming') => {
    if (!currentUser) return;
    setPostsInternal(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId && p.category === PostCategory.EVENT) {
          const newRsvp = { userId: currentUser.id, status };
          const existingRsvpIndex = p.rsvp?.findIndex(r => r.userId === currentUser.id) ?? -1;
          let updatedRsvps = [...(p.rsvp || [])];
          if (existingRsvpIndex !== -1) {
            updatedRsvps[existingRsvpIndex] = newRsvp;
          } else {
            updatedRsvps.push(newRsvp);
          }
          return { ...p, rsvp: updatedRsvps };
        }
        return p;
      })
    );
  };

  const exportPostsAsJson = () => {
    const jsonString = JSON.stringify(posts, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'naabrivalve_teated.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For privacy, we won't use exact coordinates.
          // In a real app, this would be reverse geocoded to a general area.
          // For now, just indicate that location was fetched.
          // A more refined approach would be to use a geocoding service.
          // For simplicity, we can use a placeholder or prompt user for city.
          const approxLocation = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)} (Ligikaudne)`;
          setUserLocation(approxLocation); 
          // If in create post form, could also update form field:
          // For CreatePostForm, this location is passed as a prop.
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(t('locationError', { message: error.message })); // Add 'locationError' to UI_TEXTS
          if (!UI_TEXTS['locationError']) UI_TEXTS['locationError'] = {et: "Asukoha määramine ebaõnnestus: {message}", en: "Failed to get location: {message}", ru: "Не удалось определить местоположение: {message}"};
          setUserLocation(null);
        }
      );
    } else {
      alert(t('geolocationNotSupported')); // Add 'geolocationNotSupported' to UI_TEXTS
      if (!UI_TEXTS['geolocationNotSupported']) UI_TEXTS['geolocationNotSupported'] = {et: "GPS asukoha määramine pole selles brauseris toetatud.", en: "GPS location is not supported in this browser.", ru: "GPS-местоположение не поддерживается в этом браузере."};
    }
  };

  useEffect(() => {
    if (currentUser && currentView === 'login') {
      setViewInternal('feed');
    } else if (!currentUser && currentView !== 'login') {
      setViewInternal('login');
    }
  }, [currentUser, currentView]);

  const appContextValue: AppContextType = {
    currentUser, setCurrentUser, lang, setLang, t, isSimplifiedMode, toggleSimplifiedMode,
    posts, addPost, addCommentToPost, currentView, setView, selectedPostId, setSelectedPostId,
    notificationsEnabled, toggleNotifications, exportPostsAsJson, userLocation, detectUserLocation, updatePostRsvp,
  };

  if (currentView === 'login') {
    return (
      <AppContext.Provider value={appContextValue}>
        <LoginScreen onLogin={(name) => setCurrentUser({ id: Date.now().toString(), name })} t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      </AppContext.Provider>
    );
  }

  const filteredPosts = posts.filter(post => {
    const categoryMatch = filterCategory === 'all' || post.category === filterCategory;
    const locationMatch = !filterLocation || (post.location && post.location.toLowerCase().includes(filterLocation.toLowerCase()));
    return categoryMatch && locationMatch;
  }).sort((a,b) => b.timestamp - a.timestamp); // Ensure chronological order


  const mainContentClass = isSimplifiedMode ? 'text-lg' : 'text-base';
  const headerPadding = isSimplifiedMode ? 'p-6' : 'p-4';
  const headerTitleSize = isSimplifiedMode ? 'text-3xl' : 'text-2xl';
  const buttonSimplifiedStyle = isSimplifiedMode ? 'py-3 px-5 text-base' : 'py-2 px-4 text-sm';

  return (
    <AppContext.Provider value={appContextValue}>
      <div className={`min-h-screen flex flex-col ${mainContentClass} ${isSimplifiedMode ? 'text-lg' : ''}`}>
        <header className={`bg-primary text-white shadow-md ${headerPadding} flex flex-wrap items-center justify-between`}>
          <h1 className={`font-bold ${headerTitleSize}`}>{t('appName')}</h1>
          {currentUser && (
            <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
              <span className={isSimplifiedMode ? 'text-base' : 'text-sm'}>{t('welcomeUser', { userName: currentUser.name })}</span>
              <button onClick={() => setView('settings')} title={t('settingsButton')} className={`hover:text-accent transition-colors ${buttonSimplifiedStyle}`}>
                {Icons.cog(isSimplifiedMode ? 'w-7 h-7' : 'w-6 h-6')}
              </button>
              <Button onClick={() => setCurrentUser(null)} variant="ghost" className={`!text-white hover:!bg-white/20 ${buttonSimplifiedStyle}`} t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
                {t('logoutButton')}
              </Button>
            </div>
          )}
        </header>

        <main className="flex-grow container mx-auto p-4 sm:p-6">
          {currentView === 'feed' && (
            <>
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className={`text-2xl font-semibold text-neutral-700 ${isSimplifiedMode ? 'text-3xl' : ''}`}>{t('feedTitle')}</h2>
                <Button onClick={() => setShowCreatePostModal(true)} variant="primary" className="w-full sm:w-auto" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
                  {Icons.plusCircle(isSimplifiedMode ? "w-6 h-6 mr-2" : "w-5 h-5 mr-2")}
                  {t('createPostButton')}
                </Button>
              </div>
              <FilterPanel 
                currentCategory={filterCategory}
                onCategoryChange={setFilterCategory}
                locationQuery={filterLocation}
                onLocationQueryChange={setFilterLocation}
                onDetectLocation={detectUserLocation} // Could also use a separate state for filter location input
                t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
              />
              {filteredPosts.length > 0 ? (
                <div className="space-y-6">
                  {filteredPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      currentUser={currentUser!} 
                      onAddComment={addCommentToPost} 
                      onViewPost={setSelectedPostId}
                      onRsvp={updatePostRsvp}
                      t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} 
                    />
                  ))}
                </div>
              ) : (
                <p className={`text-center text-neutral-500 py-10 ${isSimplifiedMode ? 'text-xl' : 'text-lg'}`}>{t('noPosts')}</p>
              )}
            </>
          )}

          {currentView === 'postDetail' && selectedPostId && (
            (() => {
              const post = posts.find(p => p.id === selectedPostId);
              if (!post) return <p>{t('noPosts') /* Or specific error */}</p>;
              return (
                <div>
                   <Button onClick={() => setView('feed')} variant="ghost" className="mb-4" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
                      {Icons.arrowLeft(isSimplifiedMode ? 'w-6 h-6 mr-1' : 'w-5 h-5 mr-1')} {t('backToFeed')}
                   </Button>
                   <PostCard 
                      post={post} 
                      currentUser={currentUser!} 
                      onAddComment={addCommentToPost}
                      onRsvp={updatePostRsvp}
                      isDetailView={true}
                      t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
                    />
                </div>
              );
            })()
          )}
          
          <Modal 
            isOpen={showCreatePostModal} 
            onClose={() => setShowCreatePostModal(false)} 
            titleKey="createPostButton" 
            t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
          >
            <CreatePostForm 
              onSubmit={addPost} 
              onCancel={() => setShowCreatePostModal(false)}
              userLocation={userLocation}
              onDetectLocation={detectUserLocation}
              t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
            />
          </Modal>


          {currentView === 'settings' && (
             <SettingsPanel
                currentLang={lang}
                onLangChange={setLang}
                isSimplified={isSimplifiedMode}
                onSimplifiedModeToggle={toggleSimplifiedMode}
                notificationsEnabled={notificationsEnabled}
                onNotificationsToggle={toggleNotifications}
                onExportData={exportPostsAsJson}
                t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
             />
          )}
        </main>

        <footer className={`text-center p-4 bg-neutral-200 text-neutral-600 ${isSimplifiedMode ? 'text-base' : 'text-sm'}`}>
          &copy; {new Date().getFullYear()} {t('appName')}.
        </footer>
      </div>
    </AppContext.Provider>
  );
};

export default App;
