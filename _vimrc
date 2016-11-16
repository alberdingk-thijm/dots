execute pathogen#infect()
filetype plugin indent on

set encoding=utf-8
set ai

" Tabbing controls
set tabstop=4
set softtabstop=0
set noexpandtab
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
let g:syntastic_python_python_exec = '/f/Python27/python.exe'
" let g:syntastic_python_python_exec = 'f/Python35/python.exe'

" Tab navigation
inoremap <F7> :tabn
inoremap <F8> :tabp

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
let g:SimpylFold_docstring_preview = 1

" Enable folding with the spacebar
nnoremap <space> za

" Vim-airline config
set noshowmode
set laststatus=2
let g:airline_powerline_fonts = 1
let g:airline_theme='solarized'

" Simplenote credentials
source ~/.simplenoterc
