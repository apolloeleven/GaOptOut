# ApGaOptOut

## Basic usage ##

Inset code before google analytics
```
    <script type="text/javascript" src="ApGaOptOut.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var gaOptOut = new ApGaOptOut({
                gaAppId: 'UA-xxxxxxxx-x',
                optOutCallEvent: 'click',
                elementSelector: '[href="#jsgaoptout"]',
                debug: true
            });
        });
    </script>
   
```
