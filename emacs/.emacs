;; Open .v files with Proof General's Coq mode
(load "~/.emacs.d/lisp/PG/generic/proof-site")

(require 'package)
(add-to-list 'package-archives '("melpa" . "http://melpa.org/packages/"))
(package-initialize)
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(icicle-download-dir "~/.emacs.d/icicles")
 '(package-selected-packages
   (quote
    (flycheck racer rust-playground bash-completion basic-c-compile base16-theme ## flycheck-rust company-racer company cargo rust-mode evil))))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )

;; Line numbers
(when (version<= "26.0.50" emacs-version)
 (global-display-line-numbers-mode))

;; Icicle
(load "~/srcs/icicles-install")

;; Colors
(load-theme 'base16-atelier-cave-light t)

;; Spacing
(setq-default indent-tabs-mode nil)
(setq tab-width 4)

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
