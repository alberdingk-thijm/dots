execute pathogen#infect()
filetype plugin indent on

set rtp+=~/.fzf

set encoding=utf-8
" Rebind leader key
let mapleader=","
" Tabbing controls
set tabstop=2
set softtabstop=2 " insert and delete go by 4 space increments
set expandtab
set shiftwidth=2

" Spellcheck
if version >= 700
    set spl=en spell
    set nospell
endif

" Backup files
" Create backup directory
if filewritable(".") && ! filewritable(".backup")
    silent execute '!umask 002; mkdir .backup'
endif
set backupdir=./.backup//,.,/tmp//
set directory=.,./.backup//,/tmp//

set encoding=utf-8

" Tracking where we are
set number
set cursorline
set showmatch

" Indentation
set ai
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_auto_colors = 0
autocmd VimEnter,Colorscheme * :hi IndentGuidesOdd ctermbg=0
autocmd VimEnter,Colorscheme * :hi IndentGuidesEven ctermbg=235
nnoremap <F4> :IndentGuidesToggle<CR>

" Searching
set hlsearch
nnoremap <F3> :noh<CR>
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif

set nohidden

" to ensure plugins correctly use paths in bash
set shellslash

" use base16-materia colorscheme
colo base16-gruvbox-dark-medium

" Syntax
syntax on
set hidden
let g:racer_cmd = "/home/tim/.cargo/bin/racer"

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
set list listchars=tab:\|_,trail:·
nnoremap <F6> :set list!<CR>
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
" TODO: doesn't seem to work

" fzf integration
nmap ; :Buffers<CR>
nmap <Leader>t :Files<CR>
nmap <Leader>r :Tags<CR>

" Statusline config
set noshowmode
set laststatus=2
"let g:airline_powerline_fonts = 1
"let g:airline_theme='bubblegum'
"let g:airline#extensions#tabline#enabled = 1

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
let g:ale_sign_warning = '▲'
let g:ale_sign_error = '✗'
highlight link ALEWarningSign String
highlight link ALEErrorSign Title

" Lightline
let g:lightline = { 
\   'colorscheme': '16color',
\   'active': {
\     'left': 
\       [ ['mode', 'paste'], ['filename', 'modified'] ],
\     'right':
\       [ ['lineinfo'], ['percent'], ['readonly', 'linter_warnings', 'linter_errors', 'linter_ok'] ]
\   },
\   'tabline': {
\     'left': [ [ 'bufferinfo' ], [ 'bufferbefore', 'buffercurrent', 'bufferafter'], ],
\     'right': [ [ 'close' ], ],
\   },
\   'component_expand': {
\     'linter_warnings': 'LightlineLinterWarnings',
\     'linter_errors': 'LightlineLinterErrors',
\     'linter_ok': 'LightlineLinterOK',
\     'buffercurrent': 'lightline#buffer#buffercurrent2',
\   },
\   'component_type': {
\     'readonly': 'error',
\     'linter_warnings': 'warning',
\     'linter_errors': 'error',
\     'buffercurrent': 'tabsel'
\   },
\   'component_function': {
\     'bufferbefore': 'lightline#buffer#bufferbefore',
\     'bufferafter': 'lightline#buffer#bufferafter',
\     'bufferinfo': 'lightline#buffer#bufferinfo',
\   } }

" lightline-buffer ui settings
let g:lightline_buffer_logo = ''
let g:lightline_buffer_readonly_icon = 'RO'
let g:lightline_buffer_modified_icon = '*'
let g:lightline_buffer_git_icon = ''
let g:lightline_buffer_ellipsis_icon = '..'
let g:lightline_buffer_expand_left_icon = '< '
let g:lightline_buffer_expand_right_icon = ' >'
let g:lightline_buffer_active_buffer_left_icon = ''
let g:lightline_buffer_active_buffer_right_icon = ''
let g:lightline_buffer_separator_icon = '  '

" lightline-buffer function settings
let g:lightline_buffer_show_bufnr = 1
let g:lightline_buffer_rotate = 0
let g:lightline_buffer_fname_mod = ':t'
let g:lightline_buffer_excludes = ['vimfiler']

let g:lightline_buffer_maxflen = 30
let g:lightline_buffer_maxfextlen = 3
let g:lightline_buffer_minflen = 16
let g:lightline_buffer_minfextlen = 3
let g:lightline_buffer_reservelen = 20

function! LightlineLinterWarnings() abort
  let l:counts = ale#statusline#Count(bufnr(''))
  let l:all_errors = l:counts.error + l:counts.style_error
  let l:all_non_errors = l:counts.total - l:all_errors
  return l:counts.total == 0 ? '' : printf('%d ◆', all_non_errors)
endfunction

function! LightlineLinterErrors() abort
  let l:counts = ale#statusline#Count(bufnr(''))
  let l:all_errors = l:counts.error + l:counts.style_error
  let l:all_non_errors = l:counts.total - l:all_errors
  return l:counts.total == 0 ? '' : printf('%d ✗', all_errors)
endfunction

function! LightlineLinterOK() abort
  let l:counts = ale#statusline#Count(bufnr(''))
  let l:all_errors = l:counts.error + l:counts.style_error
  let l:all_non_errors = l:counts.total - l:all_errors
  return l:counts.total == 0 ? '✓ ' : ''
endfunction

autocmd User ALELint call s:MaybeUpdateLightline()

" Update and show lightline but only if it's visible (e.g., not in Goyo)
function! s:MaybeUpdateLightline()
  if exists('#lightline')
    call lightline#update()
  end
endfunction

" GitGutter
let g:gitgutter_sign_added = '+'
let g:gitgutter_sign_modified = '~'
let g:gitgutter_sign_removed = '-'
let g:gitgutter_sign_modified_removed = '='

" Pasting
set pastetoggle=<F2>

" Limelight
let g:limelight_conceal_ctermfg = 240

" ALE
" Disable for XML since files are usually huge and xmllint is tempermental
" Disable for header files since they are too finicky.
let g:ale_pattern_options = {
\   '\.xml$': {'ale_enabled': 0},
\   '\.h$': {'ale_enabled': 0},
\}

" Only run once something has changed (or :AleLint is entered)
let g:ale_lint_on_enter = 0
" and don't go hogwild so battery can last
let g:ale_lint_on_text_changed = 'normal'

let g:ale_fixers = {
\   'rust': ['cargo'],
\   'python': ['autopep8'],
\}

let g:autofmt_autosave = 1

let g:ale_rust_cargo_use_check=1

" Integrate with airline
"let g:airline#extensions#ale#enabled = 1

" Load all plugins now
packloadall
" Load all helptags silently
silent! helptags ALL
