## Required
- Complete 'Calculator' with Validation and Errors for (1) Currency (2) Percentage
-- APR should be >= 0 only include numbers, at most have 2 decimals
-- First two fields: should only be currency, they also need a minimum value
- UI/UX (Figma) for Website
- Add Data Toggle: APR or Monthly Balance
- Add SavingsGraph

## Response Web Design
- Mobile Friendly Data Table
- Mobile Friendly Graph

## Error Handling
- ErrorBoundary: Your Payments do not cover the interest on your loan?

## Low Impact
- Add LoanDetailsContainer then LoanDetails

1) Display errors (after, during, before and during w/delay) a user has clicked or tabbed out of the input field
2) 


## Form Validation Requirements
1) Display messages after the user has input answers (with a 10ms delay)
2) Use red to indicate an invalid form field
3) Use green to indicate an acceptable form field

User inputs number:
- Valid Currency
- The current balance must be > 0
- No alphabetical characters can be used
- Must be a properly formatted currency amount
- The code will automatically include commas to user input