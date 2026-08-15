"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle, Send, Bookmark, Info, Briefcase, FileText, Plus, X, UploadCloud, ArrowLeft, Trash2, Eye, Clock, AlertTriangle, CheckCircle, Target, Banknote, Download, MapPin, Search, Play, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase/client';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createSession } from '@/app/actions/auth';
import { toggleBookmark, getBookmarkedPosts } from '@/app/actions/portofind';
import { getCVDataByUserId } from '@/app/actions/cv';
import { CVViewer } from '@/components/cv-builder/CVViewer';
import { toPng } from 'html-to-image';
import { useRouter, useSearchParams } from 'next/navigation';
// Dummy data sebagai fallback sementara Firestore kosong
const DUMMY_REELS = [
  {
    id: 'dummy-1',
    type: 'talent_showcase',
    author: {
      name: 'Rizky Fadillah',
      username: 'rizkyfadillah',
      role: 'UI/UX Designer',
      avatar: '/user.png',
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    },
    title: 'Redesigning E-Commerce Mobile App',
    description: 'Sebuah eksplorasi desain untuk aplikasi e-commerce fashion lokal. Fokus ke clean UI dan seamless checkout experience.',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    attachments: [
      { type: 'portfolio', label: 'Portofolio', url: '/personal/dashboard/portofolio' }
    ],
  },
  {
    id: 'dummy-2',
    type: 'job_vacancy',
    author: {
      name: 'Techindo Startup',
      username: 'techindostartup',
      role: 'Hiring Company',
      avatar: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=100&auto=format&fit=crop',
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    },
    title: 'Mencari Frontend Developer (React)',
    description: 'Kami mencari Frontend Engineer yang passionate dengan modern web technologies. WFO Jakarta Selatan, Gaji kompetitif.',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    attachments: [],
  },
];

export default function PortofindClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const v = searchParams.get('v');

  const [activeTab, setActiveTab] = useState<'for_you' | 'following'>('for_you');
  const [myRole, setMyRole] = useState<'worker' | 'recruiter'>('worker');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<{ fullName: string; photoUrl: string; username: string; phone?: string | null } | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCvData, setPreviewCvData] = useState<any>(null);
  const [loadingCv, setLoadingCv] = useState(false);
  const [showCvModal, setShowCvModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Feed State
  const [reels, setReels] = useState<any[]>(DUMMY_REELS);
  const [loadingFeed, setLoadingFeed] = useState(true);

  // User Post Status State
  const [activePost, setActivePost] = useState<any | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<string | null>(null);
  const [viewingOwnPost, setViewingOwnPost] = useState(false);
  const [savedFeedIndex, setSavedFeedIndex] = useState(0);


  // Delete Confirmation State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showOwnPostModal, setShowOwnPostModal] = useState(false);

  // Form State for Worker Posting
  const [postDesc, setPostDesc] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [postPosition, setPostPosition] = useState('');
  const [postSalary, setPostSalary] = useState('');
  const [showCv, setShowCv] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'template' | 'upload' | 'url'>('template');
  const [mediaUrlInput, setMediaUrlInput] = useState('');

  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  // Listen to Firebase Auth state + fetch portfolio profile via API (Admin SDK)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      console.log('[PortofindClient] Auth state:', user?.uid ?? 'not logged in');
      if (user) {
        try {
          const res = await fetch(`/api/portofind/profile?userId=${user.uid}`);
          if (res.ok) {
            const profile = await res.json();
            setUserProfile({
              fullName: profile.fullName || user.displayName || 'Worker',
              photoUrl: profile.photoUrl || user.photoURL || '/user.png',
              username: profile.username || user.email?.split('@')[0] || user.uid,
              phone: profile.phone || null,
            });
            console.log('[PortofindClient] Profile loaded via API:', profile.fullName, profile.photoUrl);
          } else {
            throw new Error('API profile gagal');
          }

          const bookmarkRes = await getBookmarkedPosts(user.uid);
          if (bookmarkRes.success) {
            setBookmarkedPosts(bookmarkRes.savedPosts);
          }
        } catch (err) {
          console.warn('[PortofindClient] Gagal fetch profile, pakai fallback:', err);
          setUserProfile({
            fullName: user.displayName || 'Worker',
            photoUrl: user.photoURL || '/user.png',
            username: user.email?.split('@')[0] || user.uid,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch active posts feed from Firestore
  const fetchFeed = useCallback(async () => {
    try {
      setLoadingFeed(true);
      const inferFormat = (url: string) => url?.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) ? 'image' : 'video';

      const res = await fetch('/api/portofind/posts', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const firestorePosts = data.posts.map((p: any) => ({
          ...p,
          media: p.mediaUrl ? { type: p.mediaFormat || inferFormat(p.mediaUrl), url: p.mediaUrl } : null,
        }));
        setReels(prev => {
          const activeInjected = prev.find(r => r.id === v);
          let combined = firestorePosts.length > 0 ? [...firestorePosts, ...DUMMY_REELS] : DUMMY_REELS;
          
          if (activeInjected) {
            combined = [activeInjected, ...combined.filter((r: any) => r.id !== activeInjected.id)];
          }
          
          const seen = new Set();
          return combined.filter((r: any) => {
            if (seen.has(r.id)) return false;
            seen.add(r.id);
            return true;
          });
        });
        console.log('[PortofindClient] Feed loaded:', firestorePosts.length, 'real posts');
      }
    } catch (err) {
      console.warn('[PortofindClient] Gagal fetch feed, pakai dummy data:', err);
      setReels(DUMMY_REELS);
    } finally {
      setLoadingFeed(false);
    }
  }, []);

  const handleToggleBookmark = async (postId: string) => {
    if (!currentUser) return false;
    try {
      const res = await toggleBookmark(currentUser.uid, postId);
      if (res.success) {
        if (res.bookmarked) {
          setBookmarkedPosts(prev => [...prev, postId]);
        } else {
          setBookmarkedPosts(prev => prev.filter(id => id !== postId));
        }
        return res.bookmarked ?? false;
      } else {
        console.error('Failed to toggle bookmark:', res.error);
        alert('Gagal menyimpan postingan. Coba lagi.');
      }
    } catch (err) {
      console.error('Exception in toggleBookmark:', err);
    }
    return bookmarkedPosts.includes(postId);
  };

  const handleShare = async (reel: any) => {
    if (!reel) return;
    
    const shareUrl = `${window.location.origin}/p/${reel.author.username}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Portofind: ${reel.title}`,
          text: `Cek postingan dari ${reel.author.name} di Portotree!`,
          url: shareUrl
        });
      } catch (error) {
        console.log('Share dibatalkan atau error:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link profil disalin ke clipboard!');
      } catch (err) {
        console.error('Gagal menyalin link:', err);
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // Cek status postingan aktif & cooldown user
  const checkUserPostStatus = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/portofind/status?userId=${userId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const inferFormat = (url: string) => url?.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) ? 'image' : 'video';
        const mappedActivePost = data.activePost ? {
          ...data.activePost,
          media: data.activePost.mediaUrl ? { type: data.activePost.mediaFormat || inferFormat(data.activePost.mediaUrl), url: data.activePost.mediaUrl } : null
        } : null;
        setActivePost(mappedActivePost);
        setIsOnCooldown(data.isOnCooldown);
        setCooldownUntil(data.cooldownUntil);
        console.log('[PortofindClient] Status:', { activePost: !!data.activePost, isOnCooldown: data.isOnCooldown });
      }
    } catch (err) {
      console.warn('[PortofindClient] Gagal cek status postingan:', err);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      checkUserPostStatus(currentUser.uid);
    }
  }, [currentUser, checkUserPostStatus]);

  // Handle URL parameter 'v' for deep linking
  const hasCheckedUrl = useRef(false);
  useEffect(() => {
    if (!v) {
      setShowOwnPostModal(false);
      return;
    }

    if (hasCheckedUrl.current) return;

    const foundInReels = reels.findIndex(r => r.id === v);
    if (foundInReels !== -1) {
      // Jika sudah ada di feed, kita scroll / jadikan activeIndex
      setActiveIndex(foundInReels);
      setShowOwnPostModal(false);
      hasCheckedUrl.current = true;
    } else {
      // Fetch data post
      fetch(`/api/portofind/post/${v}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const inferFormat = (url: string) => url?.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) ? 'image' : 'video';
            const formattedPost = {
              ...data.post,
              media: data.post.mediaUrl ? { type: data.post.mediaFormat || inferFormat(data.post.mediaUrl), url: data.post.mediaUrl } : null,
            };

            // Update activePost jika ini postingan sendiri
            if (currentUser && data.post.userId === currentUser.uid) {
              setActivePost(formattedPost);
            }
            
            // Selalu masukkan ke urutan pertama di reels dan hapus duplikat jika ada
            setReels(prev => {
              const filtered = prev.filter(r => r.id !== data.post.id);
              return [formattedPost, ...filtered];
            });
            setActiveIndex(0);
            setShowOwnPostModal(false);
          } else {
            alert('Postingan tidak ditemukan atau sudah kedaluwarsa');
            window.history.replaceState(null, '', '/personal/dashboard/portofind');
          }
          hasCheckedUrl.current = true;
        })
        .catch(err => {
          console.error('[PortofindClient] Gagal load shared post:', err);
          window.history.replaceState(null, '', '/personal/dashboard/portofind');
          hasCheckedUrl.current = true;
        });
    }
  }, [v, activePost, reels, currentUser]);

  const resetForm = () => {
    setPostDesc('');
    setPostLocation('');
    setPostPosition('');
    setPostSalary('');
    setShowCv(false);
    setShowPortfolio(false);
    setSkills([]);
    setSkillInput('');
    setMediaType('template');
    setMediaFile(null);
    setMediaPreview(null);
    setPostError(null);
  };

  const addSkillItem = () => {
    if (skillInput.trim()) {
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkillItem();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setPostSalary('');
      return;
    }
    const formatted = new Intl.NumberFormat('id-ID').format(Number(rawValue));
    setPostSalary(`Rp ${formatted}`);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setPostError('Ukuran maksimal file (foto/video) adalah 10MB.');
        e.target.value = '';
        return;
      }
      setPostError('');
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  // Upload media ke Cloudinary
  const uploadToCloudinary = async (file: File): Promise<{ url: string; publicId: string } | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
      formData.append('folder', 'portofind_posts');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      console.log('[PortofindClient] Cloudinary upload berhasil:', data.public_id);
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.error('[PortofindClient] Cloudinary upload gagal:', err);
      return null;
    }
  };

  // Submit postingan baru
  const handleSubmitPost = async () => {
    if (!currentUser) {
      setPostError('Anda harus login untuk memposting');
      return;
    }
    if (!postDesc.trim() || !postLocation.trim() || !postPosition.trim() || !postSalary.trim() || (!showCv && !showPortfolio)) {
      setPostError('Lengkapi semua field wajib terlebih dahulu');
      return;
    }

    if (mediaType === 'upload' && !mediaFile) {
      setPostError('Pilih media (foto/video) untuk diunggah terlebih dahulu');
      return;
    }

    if (mediaType === 'url' && (!mediaUrlInput.trim() || !mediaUrlInput.startsWith('http'))) {
      setPostError('Masukkan URL media yang valid (http/https)');
      return;
    }

    setIsPosting(true);
    setPostError(null);

    try {
      let mediaUrl = null;
      let mediaPublicId = null;
      let mediaFormat = 'image';

      if (mediaType === 'upload' && mediaFile) {
        const uploaded = await uploadToCloudinary(mediaFile);
        if (uploaded) {
          mediaUrl = uploaded.url;
          mediaPublicId = uploaded.publicId;
          mediaFormat = (mediaFile.type.startsWith('video/') || mediaFile.name.match(/\.(mp4|webm|mov|mkv|avi|ogg)$/i)) ? 'video' : 'image';
        } else {
          throw new Error('Gagal upload media ke server');
        }
      } else if (mediaType === 'url') {
        mediaUrl = mediaUrlInput.trim();
        mediaFormat = mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) ? 'image' : 'video';
      }

      const res = await fetch('/api/portofind/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.uid,
          author: {
            name: userProfile?.fullName || currentUser.displayName || 'Worker',
            username: userProfile?.username || currentUser.email?.split('@')[0] || currentUser.uid,
            role: 'Worker',
            avatar: userProfile?.photoUrl || currentUser.photoURL || '/user.png',
            phone: userProfile?.phone || null,
          },
          title: userProfile?.fullName || currentUser.displayName || 'Worker',
          description: postDesc,
          location: postLocation,
          desiredPosition: postPosition,
          expectedSalary: postSalary,
          skills,
          showCv,
          showPortfolio,
          mediaUrl,
          mediaPublicId,
          mediaFormat,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Gagal membuat postingan');
      }

      console.log('[PortofindClient] Postingan berhasil dibuat!');
      setShowUploadModal(false);
      resetForm();
      // Refresh status & feed
      await fetchFeed();
      await checkUserPostStatus(currentUser.uid);
    } catch (err: any) {
      console.error('[PortofindClient] Submit error:', err);
      setPostError(err.message || 'Terjadi kesalahan, coba lagi');
    } finally {
      setIsPosting(false);
    }
  };

  // Hapus postingan (cooldown tetap berjalan)
  const handleDeletePost = async () => {
    if (!activePost || !currentUser) return;
    setIsDeleting(true);
    try {
      const res = await fetch('/api/portofind/status', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: activePost.id,
          userId: currentUser.uid,
          mediaPublicId: activePost.mediaPublicId,
        }),
      });

      if (!res.ok) throw new Error('Gagal menghapus postingan');

      console.log('[PortofindClient] Postingan dihapus, cooldown tetap berjalan');
      setShowDeleteConfirm(false);
      setViewingOwnPost(false);
      setActivePost(null);
      await checkUserPostStatus(currentUser.uid);
      await fetchFeed();
    } catch (err: any) {
      console.error('[PortofindClient] Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePreviewCv = async (userId: string) => {
    setShowCvModal(true);
    setLoadingCv(true);
    try {
      const res = await getCVDataByUserId(userId);
      if (res.success && res.data) {
        setPreviewCvData(res.data);
      } else {
        setPreviewCvData(null);
      }
    } catch (err) {
      console.error("Gagal load CV:", err);
      setPreviewCvData(null);
    } finally {
      setLoadingCv(false);
    }
  };

  const handleDownloadImage = async (postId: string, authorUsername: string) => {
    try {
      const element = document.getElementById(`reel-content-${postId}`);
      if (!element) return;
      
      const dataUrl = await toPng(element, {
        quality: 0.95,
        backgroundColor: '#0f172a',
        filter: (node) => {
          if (node.classList?.contains('action-bar-exclude')) return false;
          return true;
        }
      });
      
      const link = document.createElement('a');
      link.download = `portofind-${authorUsername}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Gagal download gambar:', err);
    }
  };

  // Lihat postingan sendiri (Popup Modal)
  const handleViewOwnPost = () => {
    if (activePost) {
      setShowOwnPostModal(true);
    }
  };

  // Format tanggal cooldown
  const formatCooldownDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const [viewingBookmarks, setViewingBookmarks] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const displayedReels = viewingBookmarks 
    ? reels.filter(r => bookmarkedPosts.includes(r.id)) 
    : reels;
  const activeReel = displayedReels[activeIndex] || null;

  const handleVisible = (index: number, passedId?: string) => {
    setActiveIndex(index);
    const id = passedId || displayedReels[index]?.id;
    if (id) {
      window.history.replaceState(null, '', `?v=${id}`);
    }
  };

  const handleCloseOwnPostModal = () => {
    setShowOwnPostModal(false);
    const id = displayedReels[activeIndex]?.id;
    if (id) {
      window.history.replaceState(null, '', `?v=${id}`);
    } else {
      window.history.replaceState(null, '', '/personal/dashboard/portofind');
    }
  };

  const isJobVacancy = activeReel?.type === 'job_vacancy';
  const isTalentShowcase = activeReel?.type === 'talent_showcase';

  let DesktopPrimaryAction = null;
  if (myRole === 'worker' && isJobVacancy) {
    DesktopPrimaryAction = (
      <button className="flex flex-col items-center gap-1.5 group mt-2">
        <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
          <Briefcase className="w-7 h-7 text-white" />
        </div>
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide mt-1">Lamar</span>
      </button>
    );
  } else if (myRole === 'recruiter' && isTalentShowcase) {
    DesktopPrimaryAction = (
      <button className="flex flex-col items-center gap-1.5 group mt-2">
        <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide mt-1">Chat</span>
      </button>
    );
  }

  // Tentukan state tombol Posting
  const hasActivePost = !!activePost;
  const canPost = !hasActivePost && !isOnCooldown;

  return (
    <div className="w-full h-full flex justify-center bg-slate-950 overflow-hidden relative">
      
      {/* Role Toggle (Demo Only) */}
      <button 
        onClick={() => setMyRole(myRole === 'worker' ? 'recruiter' : 'worker')}
        className="absolute bottom-6 left-6 z-10 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white border border-white/20 shadow-sm flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer"
        title="Toggle Role (Demo)"
      >
        <span className="opacity-70">Demo:</span>
        <span className="font-bold text-emerald-400">
          {myRole === 'worker' ? 'Worker' : 'Recruiter'}
        </span>
      </button>

      {/* Tombol Posting / Lihat Postingan / Cooldown */}
      <div className="absolute top-6 left-6 md:left-auto md:right-[calc(50%+245px)] z-30 flex items-center gap-2">
        {/* Tombol Lihat Postingan (Buka Modal) */}
        {hasActivePost && (
          <button
            onClick={() => setShowOwnPostModal(true)}
            className="w-full sm:w-auto flex-1 min-w-[200px] sm:flex-none flex items-center justify-center gap-2 h-[42px] px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all border border-emerald-400"
          >
            <Eye className="w-4 h-4" />
            <span className="font-semibold text-sm">Lihat Postingan</span>
          </button>
        )}

        {/* Status Cooldown */}
        {!hasActivePost && isOnCooldown && (
          <div className="h-11 px-5 bg-slate-700/60 backdrop-blur-md border border-slate-600/40 rounded-full flex items-center gap-2 text-slate-400 shadow-lg cursor-not-allowed select-none">
            <Clock className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {cooldownUntil ? `Bisa posting ${formatCooldownDate(cooldownUntil)}` : 'Dalam masa tunggu'}
            </span>
          </div>
        )}

        {/* Tombol Posting */}
        {canPost && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="h-11 px-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 text-white transition-colors shadow-lg cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-wide">Posting</span>
          </button>
        )}

        {/* Tombol Toggle Tersimpan */}
        <button
          onClick={() => setViewingBookmarks(!viewingBookmarks)}
          className={`h-11 px-5 backdrop-blur-md border rounded-full flex items-center gap-2 transition-colors shadow-lg cursor-pointer ${
            viewingBookmarks 
              ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/50 text-amber-400' 
              : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${viewingBookmarks ? 'fill-amber-400' : ''}`} />
          <span className="font-semibold text-sm">Tersimpan</span>
        </button>
      </div>

      {/* Desktop Fixed Left Panel */}
      <div className="hidden md:flex flex-col justify-end pb-12 pr-6 w-[340px] h-full absolute left-1/2 -translate-x-[575px]">
        {activeReel && (
          <div className="flex flex-col animate-in fade-in duration-300">
            {viewingOwnPost && (
              <div className="mb-4 px-3 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl backdrop-blur-md flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="text-emerald-300 text-xs font-medium">
                  Ini adalah postingan aktif Anda. Berlaku hingga {activePost?.expiresAt ? formatCooldownDate(activePost.expiresAt) : '7 hari ke depan'}.
                </p>
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 shadow-md shrink-0">
                <Image src={activeReel.author.avatar} alt={activeReel.author.name} width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base flex items-center gap-1">
                  {activeReel.author.name}
                  {activeReel.type === 'job_vacancy' && <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm ml-1">HIRING</span>}
                </h4>
                <p className="text-slate-400 text-sm font-medium">{activeReel.location || activeReel.author.role}</p>
              </div>
            </div>
            {/* Info tags: posisi & gaji — lokasi sudah tampil di subtitle author */}
            <div className="flex flex-col gap-2 mb-3">
              {activeReel.desiredPosition && (
                <p className="text-slate-300 text-[15px] flex items-center gap-2.5">
                  <Search className="w-[18px] h-[18px] text-emerald-400 shrink-0" />
                  <span>Mencari: <span className="text-white font-semibold">{activeReel.desiredPosition}</span></span>
                </p>
              )}
              {activeReel.expectedSalary && (
                <p className="text-slate-300 text-[15px] flex items-center gap-2.5">
                  <Banknote className="w-[18px] h-[18px] text-emerald-400 shrink-0" />
                  <span className="text-white font-semibold">{activeReel.expectedSalary}</span>
                </p>
              )}
            </div>
            {/* Deskripsi collapsible dengan Judul di dalamnya */}
            <div className="mt-2 mb-5">
              <h3 className="text-white font-black text-xl leading-tight mb-1 drop-shadow-sm">{activeReel.title}</h3>
              <p className={`text-slate-300 text-base leading-relaxed drop-shadow-sm transition-all ${descExpanded ? '' : 'line-clamp-3'}`}>
                {activeReel.description}
              </p>
              {activeReel.description && activeReel.description.length > 120 && (
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="mt-1 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
                >
                  {descExpanded ? 'Sembunyikan ▲' : 'Baca selengkapnya... ▼'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeReel.skills.map((skill: string) => (
                <span key={skill} className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20 font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Feed Container */}
      <div className="w-full h-full md:max-w-[450px] mx-auto snap-y snap-mandatory overflow-y-scroll overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {viewingOwnPost && activePost ? (
          // Mode: Lihat Postingan Sendiri
          <ReelItem
            key={activePost.id}
            data={{
              ...activePost,
              media: activePost.mediaUrl ? { type: 'image', url: activePost.mediaUrl } : null,
            }}
            myRole={myRole}
            index={0}
            onVisible={() => {}}
            onPreviewCv={() => handlePreviewCv(activePost.userId)}
            onDownloadImage={handleDownloadImage}
            onShare={handleShare}
            onToggleBookmark={handleToggleBookmark}
            initialIsSaved={bookmarkedPosts.includes(activePost.id)}
            isOwnPost={true}
          />
        ) : displayedReels.length > 0 ? (
          // Mode: Feed Normal
          displayedReels.map((reel, index) => (
            <ReelItem
              key={reel.id}
              data={reel}
              myRole={myRole}
              index={index}
              onVisible={handleVisible}
              onPreviewCv={() => handlePreviewCv(reel.authorId || reel.userId)}
              onDownloadImage={handleDownloadImage}
              onToggleBookmark={handleToggleBookmark}
              onShare={handleShare}
              initialIsSaved={bookmarkedPosts.includes(reel.id)}
              isOwnPost={currentUser?.uid === (reel.authorId || reel.userId)}
            />
          ))
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
            <Bookmark className="w-16 h-16 mb-4 opacity-50" />
            <p>Belum ada postingan yang disimpan.</p>
          </div>
        )}
      </div>

      {/* Desktop Fixed Right Panel (Action Bar) */}
      <div className="hidden md:flex flex-col items-center justify-end pb-12 w-[80px] h-full absolute left-1/2 translate-x-[240px] gap-5 z-20">
        
        {/* Save/Bookmark */}
        <button onClick={() => activeReel && handleToggleBookmark(activeReel.id)} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm backdrop-blur-md">
            <Bookmark className={`w-6 h-6 transition-colors ${activeReel && bookmarkedPosts.includes(activeReel.id) ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
          </div>
          <span className="text-xs font-semibold text-slate-300">Simpan</span>
        </button>

        {/* Download */}
        <button onClick={() => activeReel && handleDownloadImage(activeReel.id, activeReel.author.username)} className="flex flex-col items-center gap-1.5 group">
          <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm backdrop-blur-md">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Download</span>
        </button>

        {/* WhatsApp / Contact */}
        {activeReel?.author?.phone && (
          <button 
            onClick={() => {
              const waNumber = activeReel.author.phone.replace(/\D/g, '');
              const message = `Halo ${activeReel.author.name}, saya melihat postingan Anda di Portotree: "${activeReel.title}"`;
              window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center transition-colors shadow-lg backdrop-blur-md hover:-translate-y-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-300">WA</span>
          </button>
        )}

        {/* Share */}
        <button onClick={() => handleShare(activeReel)} className="flex flex-col items-center gap-1.5 group mb-2">
          <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm backdrop-blur-md">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Share</span>
        </button>

        {/* Dynamic Attachments */}
        {activeReel?.attachments?.filter((att: any) => att.type === 'portfolio' || (att.type === 'cv' && myRole === 'recruiter')).map((att: any, i: number) => {
          if (att.type === 'cv') {
            return (
              <button key={i} onClick={() => handlePreviewCv(activeReel.authorId || activeReel.userId)} className="flex flex-col items-center gap-1.5 group hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 hover:border-indigo-500/60 flex items-center justify-center transition-colors shadow-lg backdrop-blur-md">
                  <FileText className="w-6 h-6 text-indigo-300" />
                </div>
                <span className="text-xs font-semibold text-indigo-200">{att.label}</span>
              </button>
            );
          } else {
            return (
              <a key={i} href={`/p/${activeReel.author.username}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 group hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/40 hover:border-indigo-500/60 flex items-center justify-center transition-colors shadow-lg backdrop-blur-md">
                  <Briefcase className="w-6 h-6 text-indigo-300" />
                </div>
                <span className="text-xs font-semibold text-indigo-200">{att.label}</span>
              </a>
            );
          }
        })}

        {DesktopPrimaryAction}
      </div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {showCvModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 md:p-8"
          >
            <div className="bg-slate-100 border border-slate-300 rounded-2xl w-full max-w-4xl h-full flex flex-col shadow-2xl overflow-hidden relative">
              <div className="flex items-center justify-between p-4 border-b border-slate-300 bg-white z-10 shrink-0">
                <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Resume - {activeReel?.author.name}
                </h3>
                <button onClick={() => { setShowCvModal(false); setPreviewCvData(null); }} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 w-full flex flex-col items-center relative overflow-y-auto overflow-x-hidden p-4 sm:p-8 bg-slate-100/50">
                {loadingCv ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                    <p className="font-medium animate-pulse">Memuat resume...</p>
                  </div>
                ) : previewCvData ? (
                  <div className="w-full max-w-[210mm] bg-white shadow-2xl mx-auto origin-top" style={{ minHeight: '297mm' }}>
                    <CVViewer data={previewCvData} forceScale={1} hideZoomControls={false} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <AlertTriangle className="w-12 h-12 mb-3 text-slate-300" />
                    <p className="font-medium">Gagal memuat resume atau resume tidak tersedia.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posting Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 md:p-6"
          >
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
              <div className="flex items-center justify-between p-4 md:px-6 border-b border-slate-100 bg-white z-10 shrink-0">
                <h3 className="text-slate-800 font-bold text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  Buat Postingan Baru
                </h3>
                <button onClick={() => { setShowUploadModal(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar">
                {/* Attachments Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lampirkan di Postingan <span className="text-red-500">*</span> <span className="text-xs text-slate-500 font-normal ml-1">(Pilih minimal 1)</span></label>
                  <div className="flex gap-4">
                    <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${showCv ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-300 hover:border-slate-400'}`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${showCv ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                        {showCv && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={showCv} onChange={() => setShowCv(!showCv)} />
                      <div className="flex items-center gap-2">
                        <FileText className={`w-5 h-5 ${showCv ? 'text-indigo-600' : 'text-slate-500'}`} />
                        <span className={`font-medium ${showCv ? 'text-indigo-700' : 'text-slate-600'}`}>CV / Resume</span>
                      </div>
                    </label>

                    <label className={`flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${showPortfolio ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-300 hover:border-slate-400'}`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${showPortfolio ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}>
                        {showPortfolio && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={showPortfolio} onChange={() => setShowPortfolio(!showPortfolio)} />
                      <div className="flex items-center gap-2">
                        <Briefcase className={`w-5 h-5 ${showPortfolio ? 'text-emerald-600' : 'text-slate-500'}`} />
                        <span className={`font-medium ${showPortfolio ? 'text-emerald-700' : 'text-slate-600'}`}>Portofolio</span>
                      </div>
                    </label>
                  </div>
                </div>


                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi <span className="text-red-500">*</span></label>
                  <textarea
                    value={postDesc}
                    onChange={(e) => setPostDesc(e.target.value)}
                    placeholder="Ceritakan sedikit tentang dirimu..."
                    rows={4}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lokasi <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan, Remote, dll"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Desired Position */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Posisi yang Diinginkan <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={postPosition}
                    onChange={(e) => setPostPosition(e.target.value)}
                    placeholder="Contoh: Frontend Developer, UI/UX Designer"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Salary Expectation */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ekspektasi Gaji <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={postSalary}
                    onChange={handleSalaryChange}
                    placeholder="Contoh: Rp 8.000.000"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Skill yang Ditonjolkan <span className="text-slate-500 font-normal">(Opsional)</span></label>
                  <div className="w-full bg-white border border-slate-300 rounded-lg p-2 flex flex-wrap gap-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                    {skills.map(skill => (
                      <span key={skill} className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-emerald-200">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-emerald-900"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                    <div className="flex-1 flex items-center min-w-[150px]">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder={skills.length === 0 ? "Ketik skill lalu klik Tambah / Enter" : "Tambah skill lain..."}
                        className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none px-2 py-1 text-sm"
                      />
                      <button 
                        type="button" 
                        onClick={addSkillItem} 
                        className={`px-3 py-1 font-semibold text-xs rounded transition-colors mr-1 ${skillInput.trim().length > 0 ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-default'}`}
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>

                {/* Media Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Pilihan Visual Postingan</label>
                  <div className="flex bg-slate-100 p-1 rounded-lg mb-3">
                    <button
                      type="button"
                      onClick={() => setMediaType('template')}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mediaType === 'template' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Gunakan Template Default
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('upload')}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mediaType === 'upload' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Upload Media
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('url')}
                      className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mediaType === 'url' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Gunakan URL
                    </button>
                  </div>

                  {/* Media URL Area */}
                  {mediaType === 'url' && (
                    <div className="mt-3 relative">
                      <input
                        type="url"
                        placeholder="https://contoh.com/video.mp4"
                        value={mediaUrlInput}
                        onChange={(e) => setMediaUrlInput(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        Masukkan link langsung (direct link) ke file gambar atau video (berakhiran .mp4, .jpg, dll).
                      </p>
                    </div>
                  )}

                  {/* Media Upload Area */}
                  {mediaType === 'upload' && (
                    <div className="w-full relative border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-center group h-32 cursor-pointer mt-3">
                      <input type="file" accept="image/*,video/*" onChange={handleMediaChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {mediaPreview ? (
                        <div className="w-full h-full relative">
                          {(mediaFile?.type.startsWith('video/') || mediaFile?.name.match(/\.(mp4|webm|mov|mkv|avi|ogg)$/i)) ? (
                            <video src={mediaPreview} className="w-full h-full object-contain bg-black" autoPlay muted loop playsInline />
                          ) : (
                            <Image src={mediaPreview} alt="Preview" fill className="object-contain" />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Ganti Media</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-emerald-600 transition-colors">
                          <UploadCloud className="w-8 h-8 mb-2 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                          <span className="font-medium text-sm">Upload Foto / Video (Wajib)</span>
                          <span className="text-xs mt-0.5 text-slate-400">Maks. 10MB</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {postError && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-red-600 text-sm">{postError}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 md:px-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setShowPreviewModal(true)}
                  disabled={!postDesc.trim() || !postLocation.trim() || !postPosition.trim() || !postSalary.trim() || (!showCv && !showPortfolio)}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button
                  onClick={() => { setShowUploadModal(false); resetForm(); }}
                  className="px-5 py-2.5 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-200 font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={!postDesc.trim() || !postLocation.trim() || !postPosition.trim() || !postSalary.trim() || (!showCv && !showPortfolio) || isPosting}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isPosting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memposting...
                    </>
                  ) : 'Posting Sekarang'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <div className="relative w-full max-w-[450px] h-[85vh] md:h-[800px] max-h-screen bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-4 right-4 z-[130] w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <ReelItem
                data={{
                  id: 'preview',
                  authorId: 'preview',
                  author: {
                    name: userProfile?.fullName || 'Nama Anda',
                    role: userProfile?.username || '@username',
                    avatar: userProfile?.photoUrl || '/default-avatar.png'
                  },
                  title: userProfile?.fullName || currentUser?.displayName || 'Nama Pekerja',
                  description: postDesc || 'Deskripsi postingan akan tampil di sini...',
                  location: postLocation || 'Lokasi',
                  desiredPosition: postPosition || 'Posisi',
                  expectedSalary: postSalary || 'Gaji',
                  skills: skills.length > 0 ? skills : ['Skill 1', 'Skill 2'],
                  media: (mediaType === 'upload' && mediaPreview) 
                    ? { type: (mediaFile?.type.startsWith('video/') || mediaFile?.name.match(/\.(mp4|webm|mov|mkv|avi|ogg)$/i)) ? 'video' : 'image', url: mediaPreview } 
                    : (mediaType === 'url' && mediaUrlInput) 
                      ? { type: mediaUrlInput.match(/\.(mp4|webm|mov|mkv|avi|ogg)(\?.*)?$/i) ? 'video' : 'image', url: mediaUrlInput } 
                      : null,
                  type: myRole === 'recruiter' ? 'job_vacancy' : 'talent_showcase',
                  attachments: [
                    showCv ? { type: 'cv', label: 'Resume', url: '#' } : null,
                    showPortfolio ? { type: 'portfolio', label: 'Portofolio', url: '#' } : null,
                  ].filter(Boolean),
                  createdAt: new Date().toISOString(),
                  likes: 0,
                  saved: 0,
                }}
                myRole={myRole}
                index={0}
                onVisible={() => {}}
                onPreviewCv={() => handlePreviewCv(currentUser?.uid || '')}
                onDownloadImage={handleDownloadImage}
                onShare={handleShare}
                onToggleBookmark={handleToggleBookmark}
                initialIsSaved={false}
                isOwnPost={true}
                forceMobileView={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Own Post Modal */}
      <AnimatePresence>
        {showOwnPostModal && activePost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-4"
          >
            <div className="relative w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[85vh]">
              
              {/* Media Thumbnail (Kiri - Vertical) */}
              {activePost.media && (
                <div className="w-full md:w-[340px] shrink-0 bg-slate-100 relative h-[300px] md:h-auto border-r border-slate-200">
                  {activePost.media.type === 'video' ? (
                    <video 
                      src={activePost.media.url}
                      controls
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  ) : (
                    <img src={activePost.media.url} alt="Media" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
              )}

              {/* Detail Postingan (Kanan) */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Detail Postingan Anda</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-xs font-medium text-emerald-600">
                        Aktif hingga {activePost.expiresAt ? formatCooldownDate(activePost.expiresAt) : '7 hari ke depan'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseOwnPostModal}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  
                  {/* Details */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Judul / Posisi</h4>
                  <p className="text-slate-700 text-sm">{activePost.desiredPosition || activePost.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">Lokasi</h4>
                    <p className="text-slate-700 text-sm flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {activePost.location}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">Ekspektasi Gaji</h4>
                    <p className="text-slate-700 text-sm font-medium text-emerald-600">{activePost.expectedSalary}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Keahlian (Skills)</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activePost.skills?.map((skill: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">Deskripsi</h4>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{activePost.description}</p>
                </div>
                </div>

              {/* Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button
                  onClick={() => {
                    handleCloseOwnPostModal();
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-colors border border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus Postingan
                </button>
              </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-lg mb-1">Hapus Postingan?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Apakah Anda yakin ingin menghapus postingan ini?
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-800 font-semibold text-sm mb-1">⚠️ Perhatian: Masa tunggu tetap berlaku</p>
                      <p className="text-amber-700 text-xs leading-relaxed">
                        Menghapus postingan ini <strong>tidak akan me-reset</strong> waktu tunggu 7 hari. 
                        Anda baru bisa membuat postingan baru pada:
                      </p>
                      <p className="text-amber-900 font-bold text-sm mt-2">
                        📅 {cooldownUntil ? formatCooldownDate(cooldownUntil) : activePost?.expiresAt ? formatCooldownDate(activePost.expiresAt) : '7 hari ke depan'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDeletePost}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Menghapus...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Ya, Hapus
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReelItem({ data, myRole, index, onVisible, onPreviewCv, onDownloadImage, isOwnPost, forceMobileView = false, initialIsSaved = false, onToggleBookmark, onShare }: {
  data: any;
  myRole: 'worker' | 'recruiter';
  index: number;
  onVisible: (idx: number, id?: string) => void;
  onPreviewCv: (url: string) => void;
  onDownloadImage?: (id: string, username: string) => void;
  isOwnPost: boolean;
  forceMobileView?: boolean;
  initialIsSaved?: boolean;
  onToggleBookmark?: (postId: string) => Promise<boolean>;
  onShare?: (reel: any) => void;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('[DEBUG ReelItem] ID:', data.id, 'Media:', data.media);
  }, [data.id, data.media]);

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved]);

  const handleToggleBookmark = async () => {
    if (onToggleBookmark) {
      const newStatus = await onToggleBookmark(data.id);
      setIsSaved(newStatus);
    } else {
      setIsSaved(!isSaved);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible(index, data.id);
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                setIsPlaying(true);
              }).catch(() => {
                setIsPlaying(false);
              });
            } else {
              setIsPlaying(true);
            }
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
  }, [index, data.id]);

  const isJobVacancy = data.type === 'job_vacancy';
  const isTalentShowcase = data.type === 'talent_showcase';

  let PrimaryAction = null;
  if (myRole === 'worker' && isJobVacancy) {
    PrimaryAction = (
      <button className={`${forceMobileView ? 'flex' : 'md:hidden flex'} flex-col items-center gap-1 group mt-4`}>
        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <span className="text-[10px] font-medium text-white drop-shadow-md uppercase tracking-wide">Lamar</span>
      </button>
    );
  } else if (myRole === 'recruiter' && isTalentShowcase) {
    PrimaryAction = (
      <button className={`${forceMobileView ? 'flex' : 'md:hidden flex'} flex-col items-center gap-1 group mt-4`}>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <span className="text-[10px] font-medium text-white drop-shadow-md uppercase tracking-wide">Chat</span>
      </button>
    );
  }

  return (
    <div ref={ref} className="w-full h-full snap-start snap-always relative flex justify-center group">

      {/* Video/Image Container */}
      <div id={`reel-content-${data.id}`} className="w-full h-full max-w-[450px] md:max-w-[380px] lg:max-w-[400px] bg-black relative shadow-2xl border-x border-slate-800 overflow-hidden shrink-0">

        {/* Background Media or Auto Template */}
        <div className="absolute inset-0 w-full h-full">
          {data.media?.type === 'image' || data.media?.type === 'video' ? (
            <>
              {/* Blurred Background for Landscape Media */}
              {/* Static Background Color Instead of Blurred Video/Image */}
              <div className="absolute inset-0 w-full h-full bg-slate-900" />
              
              {/* Main Media */}
              {data.media.type === 'image' && (
                <img
                  src={data.media.url}
                  alt={data.title}
                  className="w-full h-full object-contain relative z-10 opacity-100"
                />
              )}
              {data.media.type === 'video' && (
                <>
                  <video
                    ref={videoRef}
                    src={data.media.url}
                    autoPlay
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => {
                      const video = e.currentTarget;
                      setProgress((video.currentTime / video.duration) * 100);
                    }}
                    onClick={(e) => {
                      if (e.currentTarget.paused) {
                        e.currentTarget.play();
                      } else {
                        e.currentTarget.pause();
                      }
                    }}
                    className="w-full h-full object-contain opacity-100 cursor-pointer relative z-10"
                  />
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <Play className="w-16 h-16 text-white fill-white opacity-80 drop-shadow-2xl" />
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
                    <div className="h-full bg-white/80 transition-all duration-75" style={{ width: `${progress}%` }} />
                  </div>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />
            </>
          ) : (
            // AUTO TEMPLATE NON-MEDIA
            <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden flex items-center justify-center">
              {/* Profile Background Effect - Brighter */}
              <div className="absolute inset-0 w-full h-full opacity-90">
                <Image src={data.author.avatar} alt="Background" fill className="object-cover" />
              </div>
              
              {/* Dark Overlay to make text readable */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none"></div>

              {/* Decorative Blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px] transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] transform -translate-x-1/3"></div>

              {/* Center Content for Auto Template */}
              <div className="relative z-10 flex flex-col items-center text-center px-6 -translate-y-12">
                 <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-2xl mb-6">
                    <Image src={data.author.avatar} alt={data.author.name} width={128} height={128} className="object-cover" />
                 </div>
                 <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 drop-shadow-lg leading-tight line-clamp-3">
                   {data.author.name}
                 </h2>

                 <div className="flex flex-wrap justify-center gap-2 mb-4">
                   {data.location && (
                     <span className="flex items-center gap-1.5 text-white/95 text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-md">
                       <MapPin className="w-4 h-4" />
                       {data.location}
                     </span>
                   )}
                   {data.desiredPosition && (
                     <span className="flex items-center gap-1.5 text-white/95 text-sm bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-md">
                       <Search className="w-4 h-4" />
                       {data.desiredPosition}
                     </span>
                   )}
                 </div>

                 <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase shadow-md">
                   {data.type === 'job_vacancy' ? 'We Are Hiring' : 'Open to Work'}
                 </div>

                 {(() => {
                   const hasCV = data.attachments?.some((att: any) => att.type === 'cv');
                   const hasPortfolio = data.attachments?.some((att: any) => att.type === 'portfolio');
                   let dynamicText = '';
                   if (hasCV && hasPortfolio) dynamicText = 'CV & Portofolio';
                   else if (hasCV) dynamicText = 'CV / Resume';
                   else if (hasPortfolio) dynamicText = 'Portofolio';

                   if (!dynamicText) return null;
                   
                   const prefix = data.type === 'job_vacancy' ? 'Kami telah melampirkan' : 'Saya telah melampirkan';
                   
                   return (
                     <div className="mt-5 flex items-center justify-center gap-2 text-white/95">
                       <FileText className="w-4 h-4 text-emerald-400" />
                       <span className="text-[13px] sm:text-sm font-semibold tracking-wide drop-shadow-md">
                         {prefix} <span className="text-emerald-300">{dynamicText}</span>
                       </span>
                     </div>
                   );
                 })()}
              </div>
            </div>
          )}
        </div>

        {/* Own Post Badge */}
        {isOwnPost && (
          <div className="absolute top-4 left-4 z-10 bg-emerald-600/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-bold">Postingan Anda</span>
          </div>
        )}

        {/* Content Overlay (Mobile Only) */}
        <div className={`${forceMobileView ? 'flex' : 'md:hidden flex'} absolute bottom-0 left-0 p-4 sm:p-6 w-full z-10 flex-col justify-end pointer-events-none`}>
          <div className="flex items-center gap-3 mb-3 pointer-events-auto">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-slate-800">
              <Image src={data.author.avatar} alt={data.author.name} width={40} height={40} className="object-cover" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm flex items-center gap-1">
                {data.author.name}
                {data.type === 'job_vacancy' && <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-sm ml-1">HIRING</span>}
              </h4>
              <p className="text-white/80 text-xs">{data.location || data.author.role}</p>
            </div>
          </div>

          {/* Info tags di atas deskripsi — lokasi sudah tampil di subtitle author */}
          <div className="flex flex-col gap-1.5 mb-2">
            {data.desiredPosition && (
              <p className="text-white/95 text-[13px] font-semibold flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                {data.desiredPosition}
              </p>
            )}
            {data.expectedSalary && (
              <p className="text-white/95 text-[13px] font-semibold flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
                {data.expectedSalary}
              </p>
            )}
          </div>
          {/* Deskripsi collapsible dengan Judul di dalamnya */}
          <div className="mt-2 mb-3 pointer-events-auto">
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{data.title}</h3>
            <p className={`text-white/90 text-sm leading-relaxed drop-shadow-sm transition-all ${descExpanded ? '' : 'line-clamp-2'}`}>
              {data.description}
            </p>
            {data.description && data.description.length > 80 && (
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="mt-0.5 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-colors"
              >
                {descExpanded ? 'Sembunyikan ▲' : 'Baca selengkapnya... ▼'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
            {data.skills?.map((skill: string) => (
              <span key={skill} className="bg-white/20 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/10">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Bar (Mobile: Inside Bottom-Right) */}
      <div className={`${forceMobileView ? 'flex' : 'md:hidden flex'} absolute bottom-4 right-2 sm:right-4 z-20 flex-col items-center gap-4 action-bar-exclude`}>
        <button onClick={handleToggleBookmark} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Bookmark className={`w-6 h-6 transition-colors ${isSaved ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">Simpan</span>
        </button>

        <button onClick={() => onDownloadImage?.(data.id, data.author.username)} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Download className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">Unduh</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">WA</span>
        </button>

        <button onClick={() => onShare?.(data)} className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-semibold text-white drop-shadow-md">Share</span>
        </button>

        {/* Dynamic Attachments (Mobile) */}
        {data.attachments?.filter((att: any) => att.type === 'portfolio' || (att.type === 'cv' && myRole === 'recruiter')).map((att: any, i: number) => {
          if (att.type === 'cv') {
            return (
              <button key={i} onClick={() => onPreviewCv(att.url)} className="flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-indigo-600/40 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-indigo-100" />
                </div>
                <span className="text-[10px] font-semibold text-indigo-100 drop-shadow-md">{att.label}</span>
              </button>
            );
          } else {
            return (
              <a key={i} href={`/p/${data.author.username}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-indigo-600/40 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <Briefcase className="w-5 h-5 text-indigo-100" />
                </div>
                <span className="text-[10px] font-semibold text-indigo-100 drop-shadow-md">{att.label}</span>
              </a>
            );
          }
        })}

        {PrimaryAction}
      </div>
    </div>
  );
}
