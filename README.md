# PublicSquare
A Project for Buutti Academy's training course.

## General

A simple social media platform where people can publish their thoughts, talk with each other etc

## Front

Visual layout consists of 3 main parts: Header for loggin in and registering, PublicSquare for content and Footer for general information about the site

### Header

Handles logging in and registering a user. Future development will include showing who's logged in currently, and the ability to search content and users.

### PublicSquare

Main page for content. when user isn't logged in, displays blank. When logged, generates a list of publications. When searching, updates view based on search terms.

On top of the page, there's a button from whih user can toggle a form to make their own publication

Future features:
- private messaging
- allows viewing other users and if they are online

### Footer

Just a simple block for displaying information about the site

## Back

Backend handles logging in and registering, and adding publications. Data storage is done with PostgreSql.

Most of the functionality is divided into routers, with main index.js just handling seeding initial users and admin login.

### userRouter

Handles user interaction: login, register, in future profile editing too.

### pubRouter(WIP)

handles publication interaction: fetching all publications, searched publications, adding new ones.

### database

Handles communication with database. Has a function for initialising database tables, adding admin info, and seeding initial users. Also for adding a new user registration which also checks is given email is already in use. In addition has rough outlines for adding, modifying and deleting publications, editing user information, changing password and gettin user information for publication building.

## Database

Database used in this project is PostgreSql. Currently being run manually via Docker desktop, with plans to make a proper dockerfile in the future.

