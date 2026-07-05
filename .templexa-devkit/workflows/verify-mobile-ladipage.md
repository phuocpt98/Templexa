# Verify Mobile LadiPage Workflow

Use after any LadiPage invitation layout edit.

## Width Check

Evaluate:

```javascript
({
  clientW: document.documentElement.clientWidth,
  scrollW: document.documentElement.scrollWidth,
  bodyW: document.body.scrollWidth,
  wrapW: document.querySelector('.ladi-wraper')?.scrollWidth
})
```

Expected: `scrollW === clientW`.

## Screenshot Check

Use mobile viewport `420x900` and scroll to affected sections. Check that:

- text is not clipped
- buttons are below the intended blocks
- decorative elements do not force horizontal scroll
- section spacing does not overlap the next section

