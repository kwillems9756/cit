# CIT
CodeIgniter Toolkit where you can write templates for views, controllers and so forth

## Commands
Here is a list of all available commands and statusses
 - [Not started] `cit setup myTemplate`
 - [Working on] `cit make --use=myTemplate myFile`
 - [Not started] `cit list`
 - [Not started] `cit info --use=myTemplate`

## Make command
Using this command you can create new files based on template files.
This command (just like all others) should be ran from the root of your project.
The filepath you pass into this command should be relative to this root.

Say you want to create a file in `public/pages/index.html` using a template called `simplePage` you can run this command:
```shell
cit make --use=simplePage public/pages/index.html
```
PLEASE MAKE SURE TO ADD THE FILE EXTENSION, because it can't be determined without that.
If the template requires additional information/arguments it will prompt them, so you can easily answer them