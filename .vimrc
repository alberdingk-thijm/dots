execute pathogen#infect()
filetype plugin indent on

set encoding=utf-8
set ai

" Tabbing controls
set tabstop=4
set softtabstop=0
set expandtab
set shiftwidth=4

if version >= 700
	set spl=en spell
	set nospell
endif

set encoding=utf-8

set number

set hlsearch

set nohidden

" to ensure plugins correctly use paths in bash
set shellslash

" Syntax
syntax on

" Tab navigation
nnoremap <F7> :tabn
nnoremap <F8> :tabp

nnoremap <silent> k gk
nnoremap <silent> j gj

" split navigation
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

" Enable folding
set foldmethod=indent
set foldlevel=99

" Enable folding with the spacebar
nnoremap <space> za

" Vim-airline config
set noshowmode
set laststatus=2
let g:airline_powerline_fonts = 1
let g:airline_theme='bubblegum'
let g:airline#extensions#tabline#enabled = 1

" Pasting
set pastetoggle=<F2>

" vim-racer
set hidden
let g:racer_cmd = "/cygdrive/c/Users/timothy.alberdingk_t/.cargo/bin/"

" let g:airline_left_sep='>'
" let g:airline_left_alt_sep = '>'
" let g:airline_right_sep='<'
" let g:airline_right_alt_sep = '<'
" let g:airline_symbols.crypt = '#'
" let g:airline_symbols.branch = '\'
" let g:airline_symbols.readonly = '='
" let g:airline_symbols.linenr = '+'
" let g:airline_symbols.maxlinenr = ''
