# CIT
CodeIgniter Toolkit where you can write templates for views, controllers and so forth

## Commands
Here is a list of all available commands and statusses
 - [Working on] `cit setup myTemplate`
 - [Working on] `cit make --use=myTemplate myFile`
 - [Working on] `cit list`
 - [Working on] `cit info --use=myTemplate`

## Setup command
You can use this command to create a new template file.
It will insert the base file in the `templates` folder

You can run this using
```shell
cit setup someTemplateName
```
Where the `someTemplateName` is the name of your template without the .ejs extension

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

## List command
With this command you can list all the existing templates and view their descriptions
Use it with
```shell
cit list
```

## Info command
With this command you can request information from a certain template such as a description or information about the arguments.
If you wanted information about a template called `someTemplate` you would do this:
```shell
cit info someTemplate
```