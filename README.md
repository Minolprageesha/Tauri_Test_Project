# Modern Desktop App Template

Tauri and React boilerplate for a modern desktop application. Not a project nor a substitute tutorial for my video tutorials. I didn't use yew (wasm) since its component libraries are not to the calibre of existing React component libraries.

## Template Instructions

1. Install Tauri [prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
2. Download or Clone this repository `git clone --depth=1 https://github.com/elibroftw/modern-desktop-app-template.git new-app`
3. Go into `new-app`
4. Follow environment instructions in [`SAMPLE_README.md`](./SAMPLE_README.md)
5. While `yarn` is installing dependencies,
    - Modify `productName, identifier, title` found in `src-tauri/tauri.conf.json`
    - Modify `HEADER_TITLE, FOOTER` found in `src/utils.js`
    - Remove the `.git` folder
    - Delete or replace `LICENSE.md` since this template is public domain
    - Edit `SAMPLE_README.md` and replace `README.md`
6. Run `yarn dev` to start developing
7. Read [Tips and Trouble Shooting](#tips) section of the new `README.md`
8. If any problems arise, open an issue or contact me

[Ground-up Instructions](https://tauri.app/v1/guides/getting-started/setup/)

## RSS of Commit History

Add https://github.com/elibroftw/modern-desktop-app-template/commits.atom to your RSS reader to stay up to date!
I do not recommend pulling from my repo because you will need to edit the same files I reorganize

## [Tips](/SAMPLE_README.md#tips-and-trouble-shooting)

## Screenshots

- The four views not found in boilerplate were added by yours truly. My About is the ViewExample provided in `src`
- `Home view` is purposely not translated since it's a filler

![App screenshot with dark colorscheme](https://user-images.githubusercontent.com/21298211/209476561-5813ef56-21e6-4e64-91b5-53499ced1296.png "dark colorscheme")

![App screenshot with light colorscheme](https://user-images.githubusercontent.com/21298211/209476610-5599245b-59b1-4dcf-8dfa-a77fab0013b3.png "light colorscheme")

## Future Resources

### URL Schema (used with Single Instance)

Use the instaled single instance plugin with the reading from below to get a Windows
app URL protocol. This can be used for say Music Players, PDF Readers, etc.

- [URL schema](https://gitlab.com/ioneyed/tauri-example-singleinstance)
