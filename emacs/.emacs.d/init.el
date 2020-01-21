;; Open .v files with Proof General's Coq mode
;; (load "~/.emacs.d/lisp/PG/generic/proof-site")

(require 'package)
(setq package-enable-at-startup nil
      package-archives '(("gnu" . "https://elpa.gnu.org/packages/")
                         ("melpa-stable" . "https://stable.melpa.org/packages/")
                         ("melpa" . "https://melpa.org/packages/")
                         ("org" . "https://orgmode.org/elpa/"))
      package-pinned-packages
            '((bind-key    . "melpa")
              (diminish    . "melpa")
              (use-package . "melpa")))
(package-initialize)

;; use-package
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(eval-when-compile
  (require 'use-package)
  (setq use-package-expand-minimally byte-compile-current-file))

(setq use-package-always-ensure t)

(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(icicle-download-dir "~/.emacs.d/icicles")
 '(inhibit-startup-screen t)
 '(package-selected-packages
   (quote
    (all-the-icons-dired all-the-icons-ivy all-the-icons-gnus ts doom-themes doom-modeline flycheck racer rust-playground bash-completion basic-c-compile base16-theme ## flycheck-rust company-racer company cargo rust-mode evil))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
;; generic settings
(fset 'yes-or-no-p 'y-or-n-p)
(setq create-lockfiles nil)

;; remove menubar, toolbar, scrollbar
(menu-bar-mode -1)
(tool-bar-mode -1)
(when (fboundp 'scroll-bar-mode)
  (scroll-bar-mode -1))
(defun my/disable-scroll-bars (frame)
  (modify-frame-parameters frame
                           '((vertical-scroll-bars . nil)
                             (horizontal-scroll-bars . nil))))
(add-hook 'after-make-frame-functions 'my/disable-scroll-bars)
(global-set-key (kbd "s-t") '(lambda () (interactive)))
(setq-default frame-title-format "%b (%f)")

;;; + line numbers
;;; - blinking cursor
;;; - no bell sound
;;; + clipboard system
;(global-linum-mode)
(blink-cursor-mode 0)
(setq ring-bell-function 'ignore
      x-select-enable-clipboard t
      x-select-enable-primary t
      save-interprogram-paste-before-kill t
      apropos-do-all t
      mouse-yank-at-point t)

;; Icicle
(load "~/srcs/icicles-install")

;;; theme
(use-package all-the-icons
  :ensure t)

(use-package doom-themes
  :ensure t
  :config
   ;(if (>= (ts-hour (ts-now)) 22)
    ;  (load-theme 'doom-spacegrey t)
                                        ;    (load-theme 'doom-one-light t)))
  (load-theme 'doom-one-light t))

(use-package doom-modeline
  :ensure t
  :after doom-themes
  :init
  (setq doom-modeline-bar-width                 3
        doom-modeline-buffer-encoding           t
        doom-modeline-enable-word-count         nil
        doom-modeline-height                    25
        doom-modeline-icon                      t
        doom-modeline-indent-info               nil
        doom-modeline-lsp                       nil
        doom-modeline-major-mode-color-icon     t
        doom-modeline-major-mode-icon           t
        doom-modeline-minor-modes               nil)
  :config
  (if (memq window-system '(w32))
      (setq doom-modeline-icon                  nil
            doom-modeline-major-mode-icon       nil
            doom-modeline-major-mode-color-icon nil))
  (doom-modeline-mode))

;; Spacing
(setq-default indent-tabs-mode nil)
(setq tab-width 4)

;;; Evil settings
(setq evil-shift-width 2)
(use-package evil
  :ensure t
  :hook (after-init . evil-mode))
(use-package evil-surround
  :ensure t
  :config
  (global-evil-surround-mode 1))

(evil-ex-define-cmd "!" 'shell-command)
;;(evil-define-key 'normal proof-mode-map (kbd "M-v") 'proof-goto-point)
(evil-define-key 'normal proof-mode-map (kbd "C-c RET") 'proof-goto-point)
;;; esc quits
(define-key evil-normal-state-map [escape] 'keyboard-quit)
(define-key evil-normal-state-map (kbd "C-u") 'keyboard-quit)
(define-key evil-visual-state-map [escape] 'keyboard-quit)
(define-key minibuffer-local-map [escape] 'minibuffer-keyboard-quit)
(define-key minibuffer-local-ns-map [escape] 'minibuffer-keyboard-quit)
(define-key minibuffer-local-completion-map [escape]
            'minibuffer-keyboard-quit)
(define-key minibuffer-local-must-match-map [escape]
            'minibuffer-keyboard-quit)
(define-key minibuffer-local-isearch-map [escape]
            'minibuffer-keyboard-quit)

;; Other things
(define-key evil-normal-state-map "Y" 'copy-to-end-of-line)
(global-set-key (kbd "RET") 'newline-and-indent)

;; Backup Files
(setq
 backup-by-copying t
 backup-directory-alist `(("." . "./.backup"))
 delete-old-versions t
 kept-new-version 6
 kept-old-versions 2
 version-control t) ; use versioned backups

;; Hooks!
(add-hook 'after-init-hook 'global-company-mode)
(add-hook 'rust-mode-hook 'cargo-minor-mode)

;; Racer config
(setq racer-cmd "~/.cargo/bin/racer")
(setq racer-rust-src-path "~/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/src/")

(add-hook 'rust-mode-hook #'racer-mode)
(add-hook 'racer-mode-hook #'eldoc-mode)
(add-hook 'racer-mode-hook #'company-mode)

(add-hook 'flycheck-mode-hook #'flycheck-rust-setup)
