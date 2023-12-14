# CIT
CodeIgniter Toolkit where you can write templates for views, controllers and so forth

## Commands
Here is a list of all available commands and statusses
 - [Not tested] `cit setup myTemplate`
 - [Not tested] `cit delete myTemplate`
 - [Not tested] `cit make --use=myTemplate myFile.txt`
 - [Not tested] `cit list`
 - [Not tested] `cit info myTemplate`
 - [Yet to work on] `cit tutorial`

## Setup command
You can use this command to create a new template file.
It will insert the base file in the `templates` folder

You can run this using
```shell
cit setup someTemplateName
```
Where the `someTemplateName` is the name of your template without the .ejs extension

## Delete command
With this command you can delete a template.
The removed template will not be stored, so use this carefully.

If you want to remove some file called `myTemplate` you can run this:
```shell
cit delete myTemplate
```

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

## Tutorial command
I haven't started working on this command yet.
In some upcoming version this will guide you through a simple tutorial to explain all the commands
