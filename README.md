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

```Javasdcript
    {
        scripts: {
            "test:html": "HTMLChecker"
        }
    }
```

Then you need to create a module to set up your tests in htmlChecker.js:

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

Ex: 
```Javasdcript
    { 
        "name": "My example", 
        "url": "http://localhost:5001" 
    }
```


### ForbiddenSelectors

An array of selectors you DO NOT want to see on your pages (ex: mispelled classes, deprecated classes or combination of classes).

Ex:
```Javasdcript
    "forbiddenSelectors": [
        ".test1", ".test2"
    ]
```

Will fail the test with:

```html
    <div class="test1">Blah</div> 
    <!-- Fails -->
```
or:
```html
    <div class="test2">Blah</div> 
    <!-- Fails -->
```

You can also have more complex selectors:

```Javasdcript
    "forbiddenSelectors": [
        ".test1 .test2"
    ]
```

Will fail if you have:
```html
    <div class="test1">
        <div class="test2">Blah</div> 
    </div> 
    <!-- Fails -->
```

## Alternate configuration.

You may have several configuration files in your project. 
Here is what you can do in your package.json:

```Javasdcript
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

### Writing a test

In the htmlChecker.js, all tests should be written in the specs section:

```Javasdcript

    var config = {
        "specs": function(suite, check){
            suite.add('label', function(selector){
                check.hasAttr(selector , 'for');
                check.hasMatchingFor(selector);
            });
        },
        ...
    }
    module.exports = config;

```

### Example of tests

#### Testing children

```Javasdcript
    check.testHasChildren(moduleSelector, childSelector);
```

Ex:

```Javasdcript
    suite.add('.my-selector', function(moduleSelector){
        check.testHasChildren(moduleSelector, '.my-child-selector');
    });
```

Returns true if:

```html
    <div class="my-selector"><div class="my-child-selector"></div></div>
```

#### Testing only one child

```Javasdcript
    check.testHasOnlyOneChild(moduleSelector, childSelector);
```

Ex:

```Javasdcript
    suite.add('.my-selector', function(moduleSelector){
        check.testHasOnlyOneChild(moduleSelector, '.my-child-selector');
    });
```

Returns true if:

```html
    <div class="my-selector"><div class="my-child-selector"></div></div>
```

Returns false if:

```html
    <div class="my-selector">
        <div class="my-child-selector"></div>
        <div class="my-child-selector"></div>
    </div>
```

#### Testing empty attribute

```Javasdcript
    check.testHasEmptyAttribute(moduleSelector, attributeName);
```

Ex:

```Javasdcript
    suite.add('.my-img-selector', function(moduleSelector){
        check.testHasEmptyAttribute(moduleSelector, 'alt');
    });
```

Returns true if:

```html
    <img class="my-img-selector" alt="" src="img.png" />
```

#### Testing attribute value

```Javasdcript
    check.testOneOfAttributeValue(selector, attributeName, arrayAttributesValue);
```

Ex:

```Javasdcript
    suite.add('input.my-input', function(moduleSelector){
        check.testHasAttributeNotMatching(moduleSelector, 'type', ['checkbox', 'radio']);
    });
```



#### Testing attribute not matching regex

```Javasdcript
    check.testHasAttributeNotMatching(selector, attributeName, regularExpression)
```

Ex:

```Javasdcript
    suite.add('.my-selector', function(moduleSelector){
        check.testHasAttributeNotMatching(moduleSelector, 'my-attr', /^\[.*\]$/);
    });
```

#### Testing attribute  matching regex

```Javasdcript
    check.testHasAttributeMatching(selector, attributeName, regularExpression)
```

Ex:

```Javasdcript
    suite.add('.my-selector', function(moduleSelector){
        check.testHasAttributeMatching(moduleSelector, 'my-attr', /^\[.*\]$/);
    });
```

#### Testing class

```Javasdcript
    check.testHasClass(selector, className);
```

Ex:

```Javasdcript
    suite.add('button', function(moduleSelector){
        check.testHasClass(moduleSelector, 'btn');
    });
```

Returns true if:

```html
    <button class="btn" type="button">Ready<button>

```

#### Testing one of class

```Javasdcript
    check.testHasOneOfThoseClass(selector, classList);
```

Ex:

```Javasdcript
    suite.add('.my-selector', function(moduleSelector){
        check.testHasOneOfThoseClass(selector, ['class1','class2','class3']);
    });
```

Returns true for all the example below:

```html
    <div class="my-selector class1"></div>
    <div class="my-selector class2"></div>
    <div class="my-selector class3"></div>

```
