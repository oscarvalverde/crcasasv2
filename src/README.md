# crcasas

This sample demonstrates how to use Google Cloud Endpoints Frameworks using
Java on App Engine Standard.

## xxxx

You must add the project ID obtained when you created your project to the
sample's `pom.xml` before you can deploy the code.

To add the project ID:

0. Edit the file `pom.xml`.

0. For `<endpoints.project.id>`, replace the value `YOUR_PROJECT_ID` with
your project ID.

0. Save your changes.

## Building the project

To build the project:

    gulp build

## deploy to firebase

Copy crcasas dist files to firebase distrib files 

    $ firebase deploy

## Deploying the sample API to App Engine

To deploy the sample API:

0. Invoke the `gcloud` command to deploy the API configuration file:

         gcloud beta service-management deploy swagger.json

0. Deploy the API implementation code by invoking:

         mvn appengine:update

    The first time you upload a sample app, you may be prompted to authorize the
    deployment. Follow the prompts: when you are presented with a browser window
    containing a code, copy it to the terminal window.

0. Wait for the upload to finish.

## Sending a request to the sample API

After you deploy the API and its configuration file, you can send requests
to the API.

To send a request to the API, from a command line, invoke the following `cURL`
command:

     curl \
         -H "Content-Type: application/json" \
         -X POST \
         -d '{"message":"echo"}' \
         https://$PROJECT_ID.appspot.com/_ah/api/echo/v1/echo

You will get a 200 response with the following data:

    {
     "message": "echo"
    }

## Create a branch

1. Create the branch on your local machine and switch in this branch :
   git checkout -b [name_of_your_new_branch]
2. Push the branch on github :
   git push origin [name_of_your_new_branch]
   When you want to commit something in your branch, be sure to be in your branch.
3. You can see all branches created by using :
   git branch 

## Sync to github master

https://help.github.com/articles/syncing-a-fork/

1. git fetch upstream
2. git checkout master
3. git merge upstream/master



