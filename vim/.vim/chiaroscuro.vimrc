" Personal vimrc for chiaroscuro

set clipboard=unnamedplus

" IndentGuides colours
autocmd VimEnter,Colorscheme * :hi IndentGuidesOdd ctermbg=0
autocmd VimEnter,Colorscheme * :hi IndentGuidesEven ctermbg=8

" Appearance
colo desert

" Lightline
let g:lightline.colorscheme = 'default'

" Limelight
let g:limelight_conceal_ctermfg = 240
