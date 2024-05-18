**1. First step is the installation of devrev CLI**

Done using the Home Brew method

**2. Then we installed jq**
      
**Install devrev/typescript-sdk**

    npm install @devrev/typescript-sdk

**Creation of JS files**

    npm install
    npm run build 
    npm run package

**Once all of this is done you cand install the snapIn by**

    1.authenticate your id and org
        devrev profiles authenticate --org <devorg name> --usr <user email>

    2.create a snapIn pacakage 
        devrev snap_in_package create-one --slug my-first-snap-in | jq .

    3.create a SnapIn version 
        devrev snap_in_version create-one --path ./devrev-snaps-typescript-template | jq .


    4.create a SnapIn draft
        devrev snap_in draft


    5.Then you can install the SnapIn in your account snapIN section

 
