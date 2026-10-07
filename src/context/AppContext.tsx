import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Design,
  Inquiry,
  Collection,
  UserRole,
  InquiryMessage,
} from '../types';
import {
  INITIAL_DESIGNERS,
  INITIAL_EXPLORER,
  INITIAL_ADMIN,
  INITIAL_DESIGNS,
  INITIAL_COLLECTIONS,
  INITIAL_INQUIRIES,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  designs: Design[];
  savedDesignIds: string[];
  followedDesignerIds: string[];
  collections: Collection[];
  inquiries: Inquiry[];
  toasts: Toast[];
  activeView: string;
  selectedDesignId: string | null;
  selectedDesignerId: string | null;
  selectedCategory: string | null;
  isAuthModalOpen: boolean;
  isInquiryModalOpen: boolean;
  targetInquiryDesign: Design | null;
  targetInquiryDesigner: UserProfile | null;

  // Actions
  setActiveView: (view: string) => void;
  setSelectedDesignId: (id: string | null) => void;
  setSelectedDesignerId: (id: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  openInquiryModal: (design?: Design, designer?: UserProfile) => void;
  closeInquiryModal: () => void;
  switchUser: (user: UserProfile) => void;
  switchUserRole: (role: UserRole) => void;
  toggleSaveDesign: (designId: string) => void;
  toggleFollowDesigner: (designerId: string) => void;
  createDesign: (newDesign: Omit<Design, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>) => void;
  updateDesign: (designId: string, updates: Partial<Design>) => void;
  deleteDesign: (designId: string) => void;
  sendInquiry: (data: {
    designId?: string;
    designTitle?: string;
    designImage?: string;
    designerId: string;
    type: Inquiry['type'];
    message: string;
    budget?: string;
    preferredDate?: string;
    location?: string;
  }) => void;
  replyToInquiry: (inquiryId: string, text: string) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  createCollection: (name: string, description?: string, coverImage?: string) => void;
  addToCollection: (collectionId: string, designId: string) => void;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
  toggleFeatureDesign: (designId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence state
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('atelier_users');
    return saved ? JSON.parse(saved) : [...INITIAL_DESIGNERS, INITIAL_EXPLORER, INITIAL_ADMIN];
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('atelier_current_user');
    return saved ? JSON.parse(saved) : INITIAL_DESIGNERS[0]; // Start as Elena Rostova (Designer)
  });

  const [designs, setDesigns] = useState<Design[]>(() => {
    const saved = localStorage.getItem('atelier_designs');
    return saved ? JSON.parse(saved) : INITIAL_DESIGNS;
  });

  const [savedDesignIds, setSavedDesignIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('atelier_saved_designs');
    return saved ? JSON.parse(saved) : ['design-01', 'design-02', 'design-04'];
  });

  const [followedDesignerIds, setFollowedDesignerIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('atelier_followed_designers');
    return saved ? JSON.parse(saved) : ['designer-aarav', 'designer-kenji'];
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('atelier_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('atelier_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Navigation & Modal states
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [targetInquiryDesign, setTargetInquiryDesign] = useState<Design | null>(null);
  const [targetInquiryDesigner, setTargetInquiryDesigner] = useState<UserProfile | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('atelier_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('atelier_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('atelier_designs', JSON.stringify(designs));
  }, [designs]);

  useEffect(() => {
    localStorage.setItem('atelier_saved_designs', JSON.stringify(savedDesignIds));
  }, [savedDesignIds]);

  useEffect(() => {
    localStorage.setItem('atelier_followed_designers', JSON.stringify(followedDesignerIds));
  }, [followedDesignerIds]);

  useEffect(() => {
    localStorage.setItem('atelier_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('atelier_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const switchUser = (user: UserProfile) => {
    setCurrentUser(user);
    addToast(`Switched profile to ${user.name} (${user.role.toUpperCase()})`, 'info');
  };

  const switchUserRole = (role: UserRole) => {
    const found = allUsers.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      addToast(`Switched view to ${found.name} (${role.toUpperCase()})`, 'info');
    }
  };

  const toggleSaveDesign = (designId: string) => {
    const isSaved = savedDesignIds.includes(designId);
    let newSaved: string[];
    if (isSaved) {
      newSaved = savedDesignIds.filter((id) => id !== designId);
      addToast('Removed from your saved archive', 'info');
    } else {
      newSaved = [...savedDesignIds, designId];
      addToast('Saved to your private curation archive', 'success');
    }
    setSavedDesignIds(newSaved);

    // Update design save count
    setDesigns((prev) =>
      prev.map((d) =>
        d.id === designId ? { ...d, savesCount: isSaved ? Math.max(0, d.savesCount - 1) : d.savesCount + 1 } : d
      )
    );
  };

  const toggleFollowDesigner = (designerId: string) => {
    const isFollowed = followedDesignerIds.includes(designerId);
    let newFollowed: string[];
    const designer = allUsers.find((u) => u.id === designerId);
    if (isFollowed) {
      newFollowed = followedDesignerIds.filter((id) => id !== designerId);
      addToast(`Unfollowed ${designer?.name || 'designer'}`, 'info');
    } else {
      newFollowed = [...followedDesignerIds, designerId];
      addToast(`Following ${designer?.name || 'designer'}`, 'success');
    }
    setFollowedDesignerIds(newFollowed);
  };

  const createDesign = (newDesignData: Omit<Design, 'id' | 'createdAt' | 'viewsCount' | 'savesCount'>) => {
    const newId = `design-${Date.now().toString(36)}`;
    const newDesign: Design = {
      ...newDesignData,
      id: newId,
      viewsCount: 1,
      savesCount: 0,
      createdAt: new Date().toISOString(),
    };
    setDesigns((prev) => [newDesign, ...prev]);

    // Update user creations count
    setCurrentUser((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        creationsCount: prev.stats.creationsCount + 1,
      },
    }));

    addToast(`"${newDesign.title}" successfully published to the archive!`, 'success');
  };

  const updateDesign = (designId: string, updates: Partial<Design>) => {
    setDesigns((prev) => prev.map((d) => (d.id === designId ? { ...d, ...updates } : d)));
    addToast('Design updated successfully', 'success');
  };

  const deleteDesign = (designId: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== designId));
    addToast('Design removed from archive', 'info');
  };

  const openInquiryModal = (design?: Design, designer?: UserProfile) => {
    setTargetInquiryDesign(design || null);
    if (designer) {
      setTargetInquiryDesigner(designer);
    } else if (design) {
      const foundDesigner = allUsers.find((u) => u.id === design.designerId);
      setTargetInquiryDesigner(foundDesigner || null);
    }
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
    setTargetInquiryDesign(null);
    setTargetInquiryDesigner(null);
  };

  const sendInquiry = (data: {
    designId?: string;
    designTitle?: string;
    designImage?: string;
    designerId: string;
    type: Inquiry['type'];
    message: string;
    budget?: string;
    preferredDate?: string;
    location?: string;
  }) => {
    const newInquiry: Inquiry = {
      id: `inq-${Date.now().toString(36)}`,
      designId: data.designId,
      designTitle: data.designTitle,
      designImage: data.designImage,
      designerId: data.designerId,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerAvatar: currentUser.avatar,
      type: data.type,
      message: data.message,
      budget: data.budget,
      preferredDate: data.preferredDate,
      location: data.location || currentUser.location,
      status: 'pending',
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    closeInquiryModal();
    addToast('Inquiry transmitted directly to the designer’s private studio', 'success');
  };

  const replyToInquiry = (inquiryId: string, text: string) => {
    const newMessage: InquiryMessage = {
      id: `msg-${Date.now().toString(36)}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      timestamp: new Date().toISOString(),
    };

    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            status: inq.status === 'pending' ? 'in_discussion' : inq.status,
            replies: [...inq.replies, newMessage],
          };
        }
        return inq;
      })
    );
    addToast('Reply sent', 'success');
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq)));
    addToast(`Inquiry status updated to ${status.replace('_', ' ')}`, 'info');
  };

  const createCollection = (name: string, description?: string, coverImage?: string) => {
    const newCol: Collection = {
      id: `col-${Date.now().toString(36)}`,
      userId: currentUser.id,
      name,
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      designIds: [],
      isPrivate: false,
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [newCol, ...prev]);
    addToast(`Moodboard "${name}" created`, 'success');
  };

  const addToCollection = (collectionId: string, designId: string) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          const exists = col.designIds.includes(designId);
          if (exists) return col;
          return { ...col, designIds: [...col.designIds, designId] };
        }
        return col;
      })
    );
    addToast('Added to your moodboard', 'success');
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    addToast('Profile updated', 'success');
  };

  const toggleFeatureDesign = (designId: string) => {
    setDesigns((prev) =>
      prev.map((d) => {
        if (d.id === designId) {
          const newFeatured = !d.isFeatured;
          addToast(newFeatured ? 'Design added to Featured Editorial' : 'Design unfeatured', 'info');
          return {
            ...d,
            isFeatured: newFeatured,
            featuredBadge: newFeatured ? "Editor's Pick" : undefined,
          };
        }
        return d;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        designs,
        savedDesignIds,
        followedDesignerIds,
        collections,
        inquiries,
        toasts,
        activeView,
        selectedDesignId,
        selectedDesignerId,
        selectedCategory,
        isAuthModalOpen,
        isInquiryModalOpen,
        targetInquiryDesign,
        targetInquiryDesigner,
        setActiveView,
        setSelectedDesignId,
        setSelectedDesignerId,
        setSelectedCategory,
        setIsAuthModalOpen,
        openInquiryModal,
        closeInquiryModal,
        switchUser,
        switchUserRole,
        toggleSaveDesign,
        toggleFollowDesigner,
        createDesign,
        updateDesign,
        deleteDesign,
        sendInquiry,
        replyToInquiry,
        updateInquiryStatus,
        createCollection,
        addToCollection,
        addToast,
        updateCurrentUserProfile,
        toggleFeatureDesign,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
