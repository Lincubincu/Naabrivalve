import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Post, Comment, User, Language, PostCategory, AppView } from './types';
import { UI_TEXTS, POST_CATEGORIES, Icons } from './constants';

interface BaseComponentProps {
  lang: Language;
  t: (key: string, replacements?: Record<string, string>) => string;
  isSimplifiedMode: boolean;
}

// UI Elements
interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '', t, isSimplifiedMode, type = 'button', disabled = false }) => {
  const baseStyle = `font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 ease-in-out`;
  const simplifiedStyle = isSimplifiedMode ? 'text-lg py-3 px-6' : 'text-sm';
  
  let colorStyle = '';
  switch (variant) {
    case 'primary': colorStyle = 'bg-primary hover:bg-blue-600 text-white focus:ring-blue-500'; break;
    case 'secondary': colorStyle = 'bg-secondary hover:bg-green-600 text-white focus:ring-green-500'; break;
    case 'danger': colorStyle = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400'; break;
    case 'ghost': colorStyle = 'bg-transparent hover:bg-neutral-200 text-neutral-700 focus:ring-neutral-400 border border-neutral-300'; break;
  }
  if (disabled) {
    colorStyle = 'bg-neutral-300 text-neutral-500 cursor-not-allowed';
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${simplifiedStyle} ${colorStyle} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

interface InputProps extends BaseComponentProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholderKey: string;
  type?: string;
  className?: string;
}
export const Input: React.FC<InputProps> = ({ value, onChange, placeholderKey, type = 'text', className = '', t, isSimplifiedMode, lang }) => {
  const baseStyle = `shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary`;
  const simplifiedStyle = isSimplifiedMode ? 'text-lg py-3 px-4' : 'text-base';
  return <input type={type} value={value} onChange={onChange} placeholder={t(placeholderKey)} className={`${baseStyle} ${simplifiedStyle} ${className}`} />;
};

interface TextareaProps extends BaseComponentProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholderKey: string;
  rows?: number;
  className?: string;
}
export const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholderKey, rows = 3, className = '', t, isSimplifiedMode, lang }) => {
  const baseStyle = `shadow appearance-none border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary`;
  const simplifiedStyle = isSimplifiedMode ? 'text-lg py-3 px-4' : 'text-base';
  return <textarea value={value} onChange={onChange} placeholder={t(placeholderKey)} rows={rows} className={`${baseStyle} ${simplifiedStyle} ${className}`} />;
};

interface SelectProps extends BaseComponentProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; labelKey: string }[];
  className?: string;
  id?: string; // Added id prop
}
export const Select: React.FC<SelectProps> = ({ value, onChange, options, className = '', t, isSimplifiedMode, lang, id }) => {
  const baseStyle = `shadow border rounded w-full py-2 px-3 text-neutral-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary bg-white`;
  const simplifiedStyle = isSimplifiedMode ? 'text-lg py-3 px-4' : 'text-base';
  return (
    <select id={id} value={value} onChange={onChange} className={`${baseStyle} ${simplifiedStyle} ${className}`}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
      ))}
    </select>
  );
};

interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  titleKey: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, titleKey, children, t, isSimplifiedMode, lang }) => {
  if (!isOpen) return null;
  const simplifiedTitle = isSimplifiedMode ? 'text-2xl' : 'text-xl';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-lg ${isSimplifiedMode ? 'max-w-2xl' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`font-semibold text-neutral-800 ${simplifiedTitle}`}>{t(titleKey)}</h2>
          <button onClick={onClose} className={`text-neutral-500 hover:text-neutral-700 ${isSimplifiedMode ? 'text-2xl' : 'text-xl'}`}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};


// App Specific Components

interface LoginScreenProps extends BaseComponentProps {
  onLogin: (name: string) => void;
}
export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, t, lang, isSimplifiedMode }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className={`text-3xl font-bold mb-6 text-neutral-800 ${isSimplifiedMode ? 'text-4xl' : ''}`}>{t('appName')}</h1>
        <form onSubmit={handleSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholderKey="loginPrompt"
            t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
            className="mb-4"
          />
          <Button type="submit" variant="primary" className="w-full" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
            {t('loginButton')}
          </Button>
        </form>
      </div>
    </div>
  );
};

interface CreatePostFormProps extends BaseComponentProps {
  onSubmit: (postData: Omit<Post, 'id' | 'userId' | 'userName' | 'timestamp' | 'comments' | 'rsvp'>) => void;
  onCancel: () => void;
  userLocation: string | null;
  onDetectLocation: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit, onCancel, userLocation, onDetectLocation, t, lang, isSimplifiedMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState(userLocation || '');
  const [category, setCategory] = useState<PostCategory>(PostCategory.GENERAL);
  // Category specific fields
  const [eventDate, setEventDate] = useState('');
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    const postData: Omit<Post, 'id' | 'userId' | 'userName' | 'timestamp' | 'comments' | 'rsvp'> = {
        title,
        description,
        imageUrl: imageUrl || undefined,
        location: location || undefined,
        category,
    };

    if (category === PostCategory.EVENT) postData.eventDate = eventDate;
    if (category === PostCategory.FOR_SALE) postData.price = price;
    if (category === PostCategory.RIDE_SHARE_OFFER || category === PostCategory.RIDE_SHARE_REQUEST) {
        postData.origin = origin;
        postData.destination = destination;
        postData.isOffering = category === PostCategory.RIDE_SHARE_OFFER;
    }
    
    onSubmit(postData);
  };

  React.useEffect(() => {
    if (userLocation) setLocation(userLocation);
  }, [userLocation]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={title} onChange={e => setTitle(e.target.value)} placeholderKey="formTitleLabel" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholderKey="formDescriptionLabel" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholderKey="formImageLabel" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      <div className="flex items-center space-x-2">
        <Input value={location} onChange={e => setLocation(e.target.value)} placeholderKey="formLocationLabel" className="flex-grow" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
        <Button onClick={onDetectLocation} type="button" variant="ghost" className="shrink-0" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} >
          {Icons.mapPin(isSimplifiedMode ? "w-6 h-6 mr-1" : "w-5 h-5 mr-1")} {t('detectLocationButton')}
        </Button>
      </div>
      <Select value={category} onChange={e => setCategory(e.target.value as PostCategory)} options={POST_CATEGORIES} t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />

      {category === PostCategory.EVENT && (
        <Input value={eventDate} onChange={e => setEventDate(e.target.value)} placeholderKey="formEventDateLabel" type="date" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      )}
      {category === PostCategory.FOR_SALE && (
        <Input value={price} onChange={e => setPrice(e.target.value)} placeholderKey="formPriceLabel" type="text" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      )}
      {(category === PostCategory.RIDE_SHARE_OFFER || category === PostCategory.RIDE_SHARE_REQUEST) && (
        <>
          <Input value={origin} onChange={e => setOrigin(e.target.value)} placeholderKey="formOriginLabel" type="text" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
          <Input value={destination} onChange={e => setDestination(e.target.value)} placeholderKey="formDestinationLabel" type="text" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
        </>
      )}

      <div className="flex justify-end space-x-3">
        <Button type="button" onClick={onCancel} variant="ghost" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>{t('formCancelButton')}</Button>
        <Button type="submit" variant="primary" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>{t('formSubmitButton')}</Button>
      </div>
    </form>
  );
};

interface CommentSectionProps extends BaseComponentProps {
  postId: string;
  comments: Comment[];
  currentUser: User;
  onAddComment: (postId: string, text: string) => void;
}
export const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, currentUser, onAddComment, t, lang, isSimplifiedMode }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(postId, newComment.trim());
      setNewComment('');
    }
  };
  const textStyle = isSimplifiedMode ? 'text-base' : 'text-sm';
  const smallTextStyle = isSimplifiedMode ? 'text-sm' : 'text-xs';

  return (
    <div className={`mt-4 pt-4 border-t border-neutral-200 ${isSimplifiedMode ? 'space-y-4' : 'space-y-3'}`}>
      <h4 className={`font-semibold text-neutral-700 ${isSimplifiedMode ? 'text-lg' : 'text-md'}`}>{t('commentsLabel')} ({comments.length})</h4>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {comments.map(comment => (
          <div key={comment.id} className="bg-neutral-100 p-3 rounded-md shadow-sm">
            <p className={`font-semibold text-primary ${textStyle}`}>{comment.userName}</p>
            <p className={`text-neutral-600 ${textStyle}`}>{comment.text}</p>
            <p className={`text-neutral-400 ${smallTextStyle}`}>{new Date(comment.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex space-x-2">
        <Input 
          value={newComment} 
          onChange={e => setNewComment(e.target.value)} 
          placeholderKey="addCommentLabel" 
          className="flex-grow"
          t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
        />
        <Button onClick={handleAddComment} variant="secondary" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>{t('submitCommentButton')}</Button>
      </div>
    </div>
  );
};


interface PostCardProps extends BaseComponentProps {
  post: Post;
  currentUser: User;
  onAddComment: (postId: string, text: string) => void;
  onViewPost?: (postId: string) => void;
  isDetailView?: boolean;
  onRsvp?: (postId: string, status: 'coming' | 'not_coming') => void;
}
export const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onAddComment, onViewPost, isDetailView = false, onRsvp, t, lang, isSimplifiedMode }) => {
  const cardPadding = isSimplifiedMode ? 'p-6' : 'p-4';
  const titleSize = isSimplifiedMode ? 'text-2xl' : 'text-xl';
  const textSize = isSimplifiedMode ? 'text-base' : 'text-sm';
  const metaTextSize = isSimplifiedMode ? 'text-sm' : 'text-xs';

  const categoryLabel = POST_CATEGORIES.find(c => c.value === post.category)?.labelKey;

  const handleRsvp = (status: 'coming' | 'not_coming') => {
    if (onRsvp) {
      onRsvp(post.id, status);
    }
  };
  
  const userRsvpStatus = post.rsvp?.find(r => r.userId === currentUser.id)?.status;

  return (
    <div className={`bg-white rounded-lg shadow-lg ${cardPadding} mb-6`}>
      <h3 className={`font-bold text-neutral-800 ${titleSize} mb-2`}>{post.title}</h3>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="rounded-md my-3 max-h-96 w-full object-cover" />}
      <p className={`text-neutral-600 ${textSize} whitespace-pre-wrap mb-3`}>{post.description}</p>
      
      {post.category === PostCategory.EVENT && post.eventDate && (
        <p className={`text-neutral-500 ${metaTextSize} mb-1`}>
          <span className="font-semibold">{t('eventDateLabel')}</span> {new Date(post.eventDate).toLocaleDateString()}
        </p>
      )}
      {post.category === PostCategory.FOR_SALE && post.price && (
        <p className={`text-neutral-500 ${metaTextSize} mb-1`}>
          <span className="font-semibold">{t('formPriceLabel')}</span> {post.price}
        </p>
      )}
      {(post.category === PostCategory.RIDE_SHARE_OFFER || post.category === PostCategory.RIDE_SHARE_REQUEST) && (
        <>
          {post.origin && <p className={`text-neutral-500 ${metaTextSize} mb-1`}><span className="font-semibold">{t('formOriginLabel')}</span> {post.origin}</p>}
          {post.destination && <p className={`text-neutral-500 ${metaTextSize} mb-1`}><span className="font-semibold">{t('formDestinationLabel')}</span> {post.destination}</p>}
        </>
      )}

      <div className={`text-neutral-500 ${metaTextSize} space-y-1 mb-3`}>
        <p><span className="font-semibold">{t('postedByLabel')}</span> {post.userName}</p>
        {post.location && <p><span className="font-semibold">{t('locationLabel')}</span> {post.location}</p>}
        {categoryLabel && <p><span className="font-semibold">{t('categoryLabel')}</span> {t(categoryLabel)}</p>}
        <p>{new Date(post.timestamp).toLocaleString()}</p>
      </div>
      
      {post.category === PostCategory.EVENT && onRsvp && (
        <div className="my-3 flex space-x-2">
          <Button 
            onClick={() => handleRsvp('coming')} 
            variant={userRsvpStatus === 'coming' ? 'secondary' : 'ghost'}
            disabled={userRsvpStatus === 'coming'}
            t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
          >
            {t('rsvpComing')} ({post.rsvp?.filter(r => r.status === 'coming').length || 0})
          </Button>
          <Button 
            onClick={() => handleRsvp('not_coming')} 
            variant={userRsvpStatus === 'not_coming' ? 'danger' : 'ghost'}
            disabled={userRsvpStatus === 'not_coming'}
            t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
          >
            {t('rsvpNotComing')} ({post.rsvp?.filter(r => r.status === 'not_coming').length || 0})
          </Button>
        </div>
      )}

      {(isDetailView || (onViewPost && post.comments.length > 0)) && (
         <CommentSection postId={post.id} comments={post.comments} currentUser={currentUser} onAddComment={onAddComment} t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} />
      )}
      {!isDetailView && onViewPost && (
         <Button onClick={() => onViewPost(post.id)} variant="ghost" className="mt-3 w-full" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
           {t('viewPost')} {post.comments.length > 0 ? `(${post.comments.length} ${t('commentsLabel').toLowerCase()})` : ''}
         </Button>
      )}
    </div>
  );
};

interface SettingsPanelProps extends BaseComponentProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  isSimplified: boolean;
  onSimplifiedModeToggle: () => void;
  notificationsEnabled: boolean;
  onNotificationsToggle: () => void;
  onExportData: () => void;
}
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  currentLang, onLangChange, isSimplified, onSimplifiedModeToggle, 
  notificationsEnabled, onNotificationsToggle, onExportData,
  t, lang, isSimplifiedMode
}) => {
  const labelStyle = `block text-neutral-700 font-semibold mb-1 ${isSimplifiedMode ? 'text-lg' : 'text-base'}`;
  const toggleBase = `relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`;
  const toggleChecked = `bg-primary`;
  const toggleUnchecked = `bg-neutral-300`;
  const toggleThumb = `inline-block w-4 h-4 transform bg-white rounded-full transition-transform`;
  const toggleThumbChecked = `translate-x-6`;
  const toggleThumbUnchecked = `translate-x-1`;

  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${isSimplifiedMode ? 'space-y-8' : 'space-y-6'}`}>
      <h2 className={`text-2xl font-bold text-neutral-800 mb-6 ${isSimplifiedMode ? 'text-3xl' : ''}`}>{t('settingsTitle')}</h2>
      
      <div>
        <label htmlFor="language-select" className={labelStyle}>{t('languageLabel')}</label>
        <Select
          id="language-select"
          value={currentLang}
          onChange={(e) => onLangChange(e.target.value as Language)}
          options={[
            { value: Language.ET, labelKey: 'Eesti' }, // Using plain text for language names
            { value: Language.EN, labelKey: 'English' },
            { value: Language.RU, labelKey: 'Русский' },
          ]}
          className="mt-1"
          t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
        />
      </div>

      <div>
        <label className={labelStyle}>{t('simplifiedModeLabel')}</label>
        <button
          type="button"
          onClick={onSimplifiedModeToggle}
          className={`${toggleBase} ${isSimplified ? toggleChecked : toggleUnchecked}`}
          aria-pressed={isSimplified}
        >
          <span className={`${toggleThumb} ${isSimplified ? toggleThumbChecked : toggleThumbUnchecked}`} />
        </button>
      </div>
      
      <div>
        <label className={labelStyle}>{t('notificationsLabel')} <span className={isSimplifiedMode ? 'text-sm' : 'text-xs'}>(UI Only)</span></label>
         <button
          type="button"
          onClick={onNotificationsToggle}
          className={`${toggleBase} ${notificationsEnabled ? toggleChecked : toggleUnchecked}`}
          aria-pressed={notificationsEnabled}
        >
          <span className={`${toggleThumb} ${notificationsEnabled ? toggleThumbChecked : toggleThumbUnchecked}`} />
        </button>
      </div>

      <div>
        <Button onClick={onExportData} variant="secondary" className="w-full" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}>
          {Icons.download(isSimplifiedMode ? "w-6 h-6 mr-2" : "w-5 h-5 mr-2")}
          {t('exportDataButton')}
        </Button>
      </div>
    </div>
  );
};

interface FilterPanelProps extends BaseComponentProps {
    currentCategory: PostCategory | 'all';
    onCategoryChange: (category: PostCategory | 'all') => void;
    locationQuery: string;
    onLocationQueryChange: (query: string) => void;
    onDetectLocation: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
    currentCategory, onCategoryChange, locationQuery, onLocationQueryChange, onDetectLocation,
    t, lang, isSimplifiedMode
}) => {
    const allCategoriesOption = { value: 'all', labelKey: 'allCategoriesLabel' }; // Add 'allCategoriesLabel' to UI_TEXTS
    if (!UI_TEXTS['allCategoriesLabel']) {
        UI_TEXTS['allCategoriesLabel'] = { et: "Kõik kategooriad", en: "All Categories", ru: "Все категории" };
    }

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md mb-6 ${isSimplifiedMode ? 'space-y-4' : 'space-y-3'}`}>
            <h3 className={`font-semibold text-neutral-700 ${isSimplifiedMode ? 'text-xl' : 'text-lg'}`}>Filtreeri</h3>
            <div>
                <label className={`block text-sm font-medium text-neutral-600 ${isSimplifiedMode ? 'text-base' : ''}`}>{t('formCategoryLabel')}</label>
                <Select
                    value={currentCategory}
                    onChange={(e) => onCategoryChange(e.target.value as PostCategory | 'all')}
                    options={[allCategoriesOption, ...POST_CATEGORIES]}
                    t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
                    className="mt-1"
                />
            </div>
            <div>
                <label className={`block text-sm font-medium text-neutral-600 ${isSimplifiedMode ? 'text-base' : ''}`}>{t('formLocationLabel')}</label>
                <div className="flex items-center space-x-2 mt-1">
                    <Input
                        value={locationQuery}
                        onChange={(e) => onLocationQueryChange(e.target.value)}
                        placeholderKey="formLocationLabel" // Or a more specific placeholder like "filterLocationPlaceholder"
                        t={t} lang={lang} isSimplifiedMode={isSimplifiedMode}
                        className="flex-grow"
                    />
                     <Button onClick={onDetectLocation} type="button" variant="ghost" className="shrink-0" t={t} lang={lang} isSimplifiedMode={isSimplifiedMode} >
                        {Icons.mapPin(isSimplifiedMode ? "w-6 h-6" : "w-5 h-5")}
                    </Button>
                </div>
            </div>
        </div>
    );
};