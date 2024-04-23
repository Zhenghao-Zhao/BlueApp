import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    extend: {
      colors: {
        btn: {
          hover: 'var(--btn-hover)',
          primary: 'var(--btn-primary)',
          select: 'var(--btn-select)',
          emphasis: 'var(--btn-emphasis)'
        },
        backdrop: 'var(--backdrop)',
        scrollthumb: 'var(--scrollthumb)',
        'scrollthumb-light': 'var(--scrollthumb-light)',
        tooltip: 'var(--tooltip)',
        placeholder: 'var(--placeholder-color)',
        text: {
          primary: 'var(--text-primary)'
        },
        background: {
          primary: 'var(--background-primary)'
        },
        icon: {
          primary: 'var(--icon-primary)',
        },
        modal: {
          primary: 'var(--modal-primary)'
        }
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        'nav-height': 'var(--nav-height)',
        'guide-small': 'var(--guide-small)',
        'guide-normal': 'var(--guide-normal)',
        'footer-height': 'var(--footer-height)',
        'upload-caption': 'var(--upload-caption-width)',
        'upload-height': 'var(--upload-height)',
        'upload-width': 'var(--upload-width)',
        'upload-image-width': 'var(--upload-image-width)',
        'upload-step': '30px',
        'upload-header-height': 'var(--upload-header-height)',
        'view-width': 'var(--view-width)',
        'view-arrow-width': 'var(--view-arrow-width)',
        'view-image-width': 'var(--view-image-width)',
        'view-comment-width': 'var(--view-comment-width)',
        'view-close-top': 'var(--view-close-top)',
        'view-close-right': 'var(--view-close-right)',
        'profile-image-size': 'var(--profile-image-size)',
        'comment-header-height': 'var(--comment-header-height)',
        'comment-footer-height': 'var(--comment-footer-height)',
        'comment-input-height': 'var(--comment-input-height)',
        'comment-info-height': 'var(--comment-info-height)',
        'comment-width': 'var(--comment-width)',
        'comment-profile-image-size': 'var(--comment-profile-image-size)',
        'following-list-width': 'var(--following-list-width)',
        'following-list-height': 'var(--following-list-height)',
      },
      minWidth: {
        'upload-width': '320px',
        'upload-minWidth': 'var(--upload-image-width)',
      },
      maxWidth: {
        'grid-maxWidth': 'var(--grid-max-width)',
        'comment-maxWidth': 'var(--comment-maxWidth)'
      },
      minHeight: {
        'main-minHeight': 'var(--main-min-height)',
        'comment-top-minHeight': 'var(--comment-top-min-height)',
      },
      maxHeight: {
        'view-maxHeight': 'var(--view-max-height)',
      },
      screens: {
        'smGb': '820px',
        'lgGb': '1310px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config
