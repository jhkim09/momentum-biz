/**
 * Momentum Biz 블로그 공통 기능
 * - 공유 버튼 (URL 복사, 카카오톡, 페이스북, 트위터)
 * - 우클릭/드래그 방지
 */

(function() {
    'use strict';

    // ==========================================
    // 1. 우클릭 및 복사 방지
    // ==========================================

    // 우클릭 방지
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showToast('콘텐츠 보호를 위해 우클릭이 제한됩니다.');
        return false;
    });

    // 텍스트 선택 방지 (CSS로도 적용)
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // 드래그 방지
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 키보드 단축키 방지 (Ctrl+C, Ctrl+U, Ctrl+S, F12 등)
    document.addEventListener('keydown', function(e) {
        // Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' ||
                         e.key === 'u' || e.key === 'U' ||
                         e.key === 's' || e.key === 'S' ||
                         e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            showToast('콘텐츠 보호를 위해 이 기능이 제한됩니다.');
            return false;
        }
        // F12 개발자도구
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (개발자도구)
        if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
            e.preventDefault();
            return false;
        }
    });

    // ==========================================
    // 2. 토스트 메시지
    // ==========================================

    function showToast(message) {
        // 기존 토스트 제거
        const existingToast = document.getElementById('mmtum-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = 'mmtum-toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, 2000);
    }

    // ==========================================
    // 3. 공유 버튼 생성
    // ==========================================

    function createShareButtons() {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        // 공유 버튼 컨테이너
        const shareContainer = document.createElement('div');
        shareContainer.id = 'share-buttons';
        shareContainer.innerHTML = `
            <div class="share-wrapper">
                <button class="share-toggle" aria-label="공유하기">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                </button>
                <div class="share-menu">
                    <button class="share-btn" data-action="copy" title="링크 복사">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                    </button>
                    <button class="share-btn share-kakao" data-action="kakao" title="카카오톡 공유">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.72 6.72l-.97 3.59a.5.5 0 00.77.53l4.15-2.76c.43.04.87.07 1.33.07 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-facebook" data-action="facebook" title="페이스북 공유">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-twitter" data-action="twitter" title="트위터 공유">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            /* 텍스트 선택 방지 */
            body {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            input, textarea {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
            }

            /* 토스트 애니메이션 */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            /* 공유 버튼 스타일 */
            #share-buttons {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 9999;
            }

            .share-wrapper {
                position: relative;
            }

            .share-toggle {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%);
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(30, 58, 95, 0.3);
                transition: all 0.3s ease;
            }

            .share-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(30, 58, 95, 0.4);
            }

            .share-menu {
                position: absolute;
                bottom: 70px;
                right: 0;
                display: flex;
                flex-direction: column;
                gap: 8px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: all 0.3s ease;
            }

            .share-wrapper.active .share-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .share-btn {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                background: white;
                color: #374151;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            .share-btn:hover {
                transform: scale(1.1);
            }

            .share-btn[data-action="copy"]:hover {
                background: #1e3a5f;
                color: white;
            }

            .share-kakao {
                background: #FEE500 !important;
                color: #3C1E1E !important;
            }

            .share-facebook {
                background: #1877F2 !important;
                color: white !important;
            }

            .share-twitter {
                background: #000000 !important;
                color: white !important;
            }

            /* 모바일 대응 */
            @media (max-width: 640px) {
                #share-buttons {
                    bottom: 16px;
                    right: 16px;
                }
                .share-toggle {
                    width: 48px;
                    height: 48px;
                }
                .share-btn {
                    width: 40px;
                    height: 40px;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(shareContainer);

        // 이벤트 리스너
        const toggle = shareContainer.querySelector('.share-toggle');
        const wrapper = shareContainer.querySelector('.share-wrapper');

        toggle.addEventListener('click', function() {
            wrapper.classList.toggle('active');
        });

        // 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', function(e) {
            if (!shareContainer.contains(e.target)) {
                wrapper.classList.remove('active');
            }
        });

        // 공유 버튼 클릭 이벤트
        shareContainer.querySelectorAll('.share-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                handleShare(action, pageUrl, pageTitle);
            });
        });
    }

    function handleShare(action, pageUrl, pageTitle) {
        const url = decodeURIComponent(pageUrl);
        const title = decodeURIComponent(pageTitle);

        switch(action) {
            case 'copy':
                navigator.clipboard.writeText(url).then(function() {
                    showToast('링크가 복사되었습니다!');
                }).catch(function() {
                    // Fallback
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showToast('링크가 복사되었습니다!');
                });
                break;

            case 'kakao':
                // 카카오톡 공유 (Kakao SDK 필요)
                if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
                    Kakao.Share.sendDefault({
                        objectType: 'feed',
                        content: {
                            title: title,
                            description: document.querySelector('meta[name="description"]')?.content || '',
                            imageUrl: document.querySelector('meta[property="og:image"]')?.content || 'https://mmtum.co.kr/images/logo.jpg',
                            link: {
                                mobileWebUrl: url,
                                webUrl: url
                            }
                        },
                        buttons: [{
                            title: '자세히 보기',
                            link: {
                                mobileWebUrl: url,
                                webUrl: url
                            }
                        }]
                    });
                } else {
                    // Kakao SDK 없으면 모바일 공유 시도
                    window.open('https://story.kakao.com/share?url=' + pageUrl, '_blank', 'width=600,height=400');
                }
                break;

            case 'facebook':
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + pageUrl, '_blank', 'width=600,height=400');
                break;

            case 'twitter':
                window.open('https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + pageTitle, '_blank', 'width=600,height=400');
                break;
        }
    }

    // ==========================================
    // 초기화
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createShareButtons);
    } else {
        createShareButtons();
    }

})();
