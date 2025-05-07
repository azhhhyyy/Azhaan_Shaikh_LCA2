# Azhaan_Shaikh_LCA2
Azhaan Shaikh 1122230168 SEM IV UX Front End LCA 2

Prototype Link:
https://www.figma.com/design/PeJNKov2kSv14kceYpGISG/prototype?m=auto&t=fpfpO8E10Ml8UMu3-1


Minimum of two DOM traversal methods used (document.getElementByID, document.getElementsbyTagName, querySelectorAll, etc):

In login.js, the togglePasswordVisibility function uses previousElementSibling:
line no. 13 in login.js

Add/Modify at least one element to the DOM at runtime (using any event), by creating the element, assigning it attributes, and inserting it in the DOM using one of the DOM manipulation methods (append(), prepend(), insertBefore(), etc):

In login.js on line 122, there's a showError() function that:
Creates a new div element
Assigns it attributes (className, textContent, and styles)
Inserts it into the DOM using appendChild()

Minimum of one DOM tree navigation property used (.firstElementChild, .nextSibling, .children, .parentElement, childNodes, etc)

In login.js code line 12, the togglePasswordVisibility function uses previousElementSibling:

In signup.js code line 192, there's another use of previousElementSibling in the password toggle functionality:


