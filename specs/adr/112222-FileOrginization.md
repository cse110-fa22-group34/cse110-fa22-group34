# File Origanization 

## Context and Problem Statement

How do we ensure that all our code is organized within the GitHub repository?

## Considered Options

* Considered organizing by feature such as calendar, expense table, etc...
* Considered organizing by type of file such as style (.css) files and scripts (.js)
* Considered organizing by different website pages like the team page vs main page

## Decision Outcome
We decided upon organizing by type of file such as style (.css) files and scripts (.js) with the html outside of folders.

We agreed to have one main html page for our main website page and have 1 css file and 1 js file per feature. The .css file goes in the style folder and the .js goes in the scripts folder. Each file is named by feature with the appropriate extension. 

We decided against organizing by feature such as calendar, expense table, etc ... because for file orginization it would be easier to find by extension rather than feature and because not all features need a javascript or css files.

We will somewhat organize by different webpages but given the team page does not have additional functionality it can just exisit in the main folder.
