execute pathogen#infect()
filetype plugin indent on

set rtp+=/usr/share/vim/vimfiles/plugin

set encoding=utf-8
" Rebind leader key
let mapleader=","
" Tabbing controls
set shiftwidth=4
set tabstop=4
set softtabstop=4 " insert and delete go by 2 space increments
set expandtab
" Alternatives
au FileType vim setl sw=2 ts=2 sts=2 et
au FileType xml setl sw=2 ts=2 sts=2 et
au FileType json setl sw=2 ts=2 sts=2 et
au FileType ron setl sw=2 ts=2 sts=2 et
au FileType ocaml setl sw=2 ts=2 sts=2 et

" to ensure plugins correctly use paths in bash
set shellslash

" Backup files
" Create backup directory
if filewritable(".") && ! filewritable(".backup")
    silent execute '!umask 002; mkdir .backup'
endif
set backupdir=./.backup//,.,/tmp//
set directory=.,./.backup//,/tmp//

" Tracking where we are
set number
set cursorline
set showmatch

" Pasting
set pastetoggle=<F2>

" Spellcheck
if version >= 700
    set spl=en spell
    set nospell
endif

" Searching
set hlsearch
nnoremap <F3> :noh<CR>
if executable('rg')
  let g:ackprg = 'rg --vimgrep'
elseif executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif

" Syntax and auto-complete
syntax on
set hidden

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

" Statusline config
set noshowmode
set laststatus=2

" Cursor shapes (VTE terminals)
let &t_SI = "\<Esc>[6 q"
let &t_SR = "\<Esc>[4 q"
let &t_EI = "\<Esc>[2 q"

" Test indentation guides
" Colors are set from $HOST.vimrc
    " x
        " y
            " z
set ai
nnoremap <F4> :IndentGuidesToggle<CR>
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_auto_colors = 0

" fzf integration
nmap ; :Buffers<CR>
nmap <Leader>t :Files<CR>
nmap <Leader>r :Tags<CR>

" ALE
let g:ale_sign_warning = '▲'
let g:ale_sign_error = '✗'
highlight link ALEWarningSign String
highlight link ALEErrorSign Title
nmap <Leader>j :ALENextWrap<CR>
nmap <Leader>k :ALEPreviousWrap<CR>

" Lightline
let g:lightline = { 
\   'colorscheme': 'default',
\   'active': {
\     'left': 
\       [ ['mode', 'paste'], ['filename', 'modified'] ],
\     'right':
\       [ ['lineinfo'], ['percent'], ['readonly', 'linter_checking', 'linter_warnings', 'linter_errors', 'linter_ok'] ]
\   },
\   'tabline': {
\       'left': [ [ 'buffers' ] ],
\       'right': [ [ ] ],
\   },
\   'component_expand': {
\     'linter_checking': 'lightline#ale#checking',
\     'linter_warnings': 'lightline#ale#warnings',
\     'linter_errors': 'lightline#ale#errors',
\     'linter_ok': 'lightline#ale#ok',
\     'buffercurrent': 'lightline#bufferline#buffers',
\   },
\   'component_type': {
\     'readonly': 'error',
\     'linter_checking': 'left',
\     'linter_errors': 'error',
\     'linter_warnings': 'warning',
\     'linter_ok': 'left',
\     'buffers': 'tabsel'
\   },
\}

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
let g:ale_rust_cargo_check_tests=1
let g:ale_rust_cargo_check_examples=1

" Delegate to host-specific vimrc
let s:host_vimrc = $HOME . '/.vim/' . hostname() . '.vimrc'
if filereadable(s:host_vimrc)
  execute 'source ' . s:host_vimrc
endif

" let g:LanguageClient_serverCommands = {
" \ 'rust': ['ra_lsp_server'],
" \ }
" let g:LanguageClient_loggingFile = expand('~/.vim/LanguageClient.log')

" nnoremap <Tab> :call LanguageClient_contextMenu()<CR>

" Load all plugins now
packloadall
" Load all helptags silently
silent! helptags ALL
" ## added by OPAM user-setup for vim / base ## 93ee63e278bdfc07d1139a748ed3fff2 ## you can edit, but keep this line
let s:opam_share_dir = system("opam config var share")
let s:opam_share_dir = substitute(s:opam_share_dir, '[\r\n]*$', '', '')

let s:opam_configuration = {}

function! OpamConfOcpIndent()
  execute "set rtp^=" . s:opam_share_dir . "/ocp-indent/vim"
endfunction
let s:opam_configuration['ocp-indent'] = function('OpamConfOcpIndent')

function! OpamConfOcpIndex()
  execute "set rtp+=" . s:opam_share_dir . "/ocp-index/vim"
endfunction
let s:opam_configuration['ocp-index'] = function('OpamConfOcpIndex')

function! OpamConfMerlin()
  let l:dir = s:opam_share_dir . "/merlin/vim"
  execute "set rtp+=" . l:dir
endfunction
let s:opam_configuration['merlin'] = function('OpamConfMerlin')

let s:opam_packages = ["ocp-indent", "ocp-index", "merlin"]
let s:opam_check_cmdline = ["opam list --installed --short --safe --color=never"] + s:opam_packages
let s:opam_available_tools = split(system(join(s:opam_check_cmdline)))
for tool in s:opam_packages
  " Respect package order (merlin should be after ocp-index)
  if count(s:opam_available_tools, tool) > 0
    call s:opam_configuration[tool]()
  endif
endfor
" ## end of OPAM user-setup addition for vim / base ## keep this line
