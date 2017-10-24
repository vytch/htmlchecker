# htmlchecker
Think about it as unity-test applied to HTML.

HTMLchecker is a tool that will allow you to create test automation for your HTML.
This tool can have multiple applications, including:

- Checking if your HTML respect basic rules for accessibility.
- Checking if your HTML respect the requireements of your javascript components.

## installation

```
    npm install --save-dev htmlchecker
```

## Usage

In your package.json, you can create a script

```
    {
        scripts: {
            "test:html": "HTMLChecker"
        }
    }
```

Then you need to create a module to set up your tests:

```Javascript
    var config = {
        "specs": function(suite, check){
            suite.add('label', function(selector){
                check.hasAttr(selector , 'for');
                check.hasMatchingFor(selector);
            });
        },
        "pages": [
            { 
              "name": "My example", 
              "url": "http://localhost:5001" 
            }
        ],
        "forbiddenSelectors": [
            ".test1", ".test2"
        ]
    }

    module.exports = config;
```

### specs 

Function that registers the tests.
When called, it passes 2 arguments:
- suite: The suite object where the test is registered.
- check: The testing framework.

### Pages

An array of locations.
Each location has 2 properties:
- name: the name of the page.
- url: the url of the page.

### ForbiddenSelectors

An array of selectors you DO NOT want to see on your pages (ex: mispelled classes, deprecated classes or combination of classes).

## Alternate configuration.

You may have several configuration files in your project. 
Here is what you can do in your package.json:

```
    {
        scripts: {
            "test:html": "HTMLChecker --config=alternateConfig.js"
        }
    }
```

Where alternateConfig.js could be:

```Javascript
    var config = {
        "specs": function(suite, check){
            suite.add('label', function(selector){
                check.hasAttr(selector , 'for');
                check.hasMatchingFor(selector);
            });
        },
        "pages": [
            { 
              "name": "My example", 
              "url": "http://staging.myProject.com" 
            }
        ]
    }

    module.exports = config;
```

## Docs

