execute pathogen#infect()
filetype plugin indent on

set encoding=utf-8
set ai
" Rebind leader key
let mapleader=","

" Tabbing controls
set tabstop=4
set softtabstop=4 " insert and delete go by 4 space increments
set expandtab
set shiftwidth=4

" Spellcheck
if version >= 700
    set spl=en spell
    set nospell
endif

set encoding=utf-8

" Tracking where we are
set number
set cursorline
set showmatch

" Searching
set hlsearch
nnoremap <F3> :noh<CR>

set nohidden

" to ensure plugins correctly use paths in bash
set shellslash

" Syntax
syntax on

" Tab navigation
nnoremap <F7> :tabn<CR>
nnoremap <F8> :tabp<CR>

nnoremap <silent> k gk
nnoremap <silent> j gj

" Easy buffer switching
nnoremap <F5> :buffers<CR>:buffer<Space>

" split navigation
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>

" Enable folding
set foldmethod=indent
set foldlevel=99
set foldlevelstart=10
set foldnestmax=10

" Enable folding with the spacebar
nnoremap <space> za

" Whitespace cleanup
function! Preserve(command)
    " Preparation: save last search, and cursor position.
    let _s=@/
    let l = line(".")
    let c = col(".")
    " Do the business:
    execute a:command
    " Clean up: restore previous search history, and cursor position
    let @/=_s
    call cursor(l, c)
endfunction
nmap ,$ :call Preserve("%s/\\s+$//e")<CR>
nmap ,= :call Preserve("normal gg=G")<CR>

" Vim-airline config
set noshowmode
set laststatus=2
let g:airline_powerline_fonts = 1
let g:airline_theme='bubblegum'
let g:airline#extensions#tabline#enabled = 1

" Pasting
set pastetoggle=<F2>

" Limelight
let g:limelight_conceal_ctermfg = 240

" let g:airline_left_sep='>'
" let g:airline_left_alt_sep = '>'
" let g:airline_right_sep='<'
" let g:airline_right_alt_sep = '<'
" let g:airline_symbols.crypt = '#'
" let g:airline_symbols.branch = '\'
" let g:airline_symbols.readonly = '='
" let g:airline_symbols.linenr = '+'
" let g:airline_symbols.maxlinenr = ''

" ALE
" Disable for XML since files are usually huge and xmllint is tempermental
let g:ale_pattern_options = {'\.xml$': {'ale_enabled': 0}}

" Only run once something has changed (or :AleLint is entered)
let g:ale_lint_on_enter = 0
" and don't go hogwild so battery can last
let g:ale_lint_on_text_changed = 'normal'

let g:ale_fixers = {
\   'rust': ['cargo'],
\   'python': ['autopep8'],
\}

let g:ale_rust_cargo_use_check=1

" Integrate with airline
let g:airline#extensions#ale#enabled = 1

" Load all plugins now
packloadall
" Load all helptags silently
silent! helptags ALL
