# E-Commerce Application Test Plan

/*Note:
✅ Authentication & Registration (15 tests) - Registration flows, validation, login, password reset
✅ Dashboard & Product Browsing (7 tests) - Product search, filtering, sorting, viewing details
✅ Shopping Cart & Checkout (14 tests) - Add/remove items, cart management, payment, coupons
✅ Order Management (8 tests) - Order history, tracking, cancellation, returns, invoicing
✅ User Profile (7 tests) - Profile editing, password changes, address management
✅ Performance & Security (5 tests) - Load time, session timeout, HTTPS, XSS protection
✅ Edge Cases & Boundary Tests (8 tests) - Large data handling, stock limits, special characters, concurrent requests
*/

## Application Overview

Comprehensive test plan for Rahul Shetty Academy e-commerce platform (Let's Shop). This application is a full-featured e-commerce system with user authentication, product catalog, shopping cart, checkout process, and order management. The platform includes user registration/login, product search and browsing, cart management, payment processing, and order tracking features.

## Test Scenarios

### 1. Authentication & Registration

**Seed:** `tests/seed.spec.ts`

#### 1.1. User Registration - Positive Flow

**File:** `tests/auth/registration.positive.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/client/#/auth/register
    - expect: Registration page loads successfully
    - expect: All form fields are visible (First Name, Last Name, Email, Phone, Occupation, Gender, Password, Confirm Password)
    - expect: Register button is enabled
  2. Enter valid first name 'John' in First Name field
    - expect: First name is entered correctly
  3. Enter valid last name 'Doe' in Last Name field
    - expect: Last name is entered correctly
  4. Enter valid email 'john.doe.123@gmail.com' in Email field
    - expect: Email is entered correctly
    - expect: No validation error appears
  5. Enter valid phone number '9876543210' in Phone Number field
    - expect: Phone number is entered correctly
  6. Select 'Engineer' from Occupation dropdown
    - expect: Occupation is selected and displayed
  7. Select 'Male' from Gender radio buttons
    - expect: Male radio button is selected
  8. Enter password 'TestPass@123' in Password field
    - expect: Password is entered (masked display)
    - expect: Password strength indicator may appear
  9. Enter same password 'TestPass@123' in Confirm Password field
    - expect: Confirm password is entered (masked display)
  10. Check 'I am 18 year or Older' checkbox
    - expect: Checkbox is checked
  11. Click Register button
    - expect: Registration is successful
    - expect: User is redirected to login page or dashboard
    - expect: Success message appears

#### 1.2. User Registration - Invalid Email Format

**File:** `tests/auth/registration.invalid-email.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration page loads successfully
  2. Fill all required fields with valid data except email
    - expect: All fields are filled except email
  3. Enter invalid email 'invalidemail@' in Email field
    - expect: Invalid email format is entered
  4. Click Register button
    - expect: Registration fails
    - expect: Error message appears: 'Please enter valid email'
    - expect: User remains on registration page

#### 1.3. User Registration - Passwords Do Not Match

**File:** `tests/auth/registration.password-mismatch.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration page loads successfully
  2. Fill all fields with valid data
    - expect: All fields are filled
  3. Enter password 'TestPass@123' in Password field
    - expect: Password is entered
  4. Enter different password 'DifferentPass@123' in Confirm Password field
    - expect: Different password is entered
  5. Click Register button
    - expect: Registration fails
    - expect: Error message appears: 'Password and confirm password do not match'
    - expect: User remains on registration page

#### 1.4. User Registration - Missing Required Fields

**File:** `tests/auth/registration.missing-fields.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration page loads successfully
  2. Fill only First Name and Last Name, leave other fields empty
    - expect: First and Last name are filled, other fields are empty
  3. Click Register button
    - expect: Registration fails
    - expect: Error messages appear for each empty required field
    - expect: User remains on registration page

#### 1.5. User Registration - Age Checkbox Not Checked

**File:** `tests/auth/registration.age-checkbox.spec.ts`

**Steps:**
  1. Navigate to registration page and fill all fields
    - expect: All fields are filled
  2. Do not check 'I am 18 year or Older' checkbox
    - expect: Checkbox remains unchecked
  3. Click Register button
    - expect: Registration fails
    - expect: Error message appears: 'You must be 18 years or older'
    - expect: User remains on registration page

#### 1.6. User Registration - Duplicate Email

**File:** `tests/auth/registration.duplicate-email.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration page loads successfully
  2. Fill all fields with an email that was previously registered (e.g., existing.user@gmail.com)
    - expect: Form is filled with duplicate email
  3. Click Register button
    - expect: Registration fails
    - expect: Error message appears: 'This email is already registered'
    - expect: User remains on registration page

#### 1.7. User Registration - Phone Number with Invalid Format

**File:** `tests/auth/registration.invalid-phone.spec.ts`

**Steps:**
  1. Navigate to registration page and fill all fields
    - expect: All fields are filled
  2. Enter invalid phone number 'ABCD1234' in Phone Number field
    - expect: Invalid phone is entered
  3. Click Register button
    - expect: Registration fails
    - expect: Error message appears about invalid phone format
    - expect: User remains on registration page

#### 1.8. User Login - Positive Flow

**File:** `tests/auth/login.positive.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/client/#/auth/login
    - expect: Login page loads successfully
    - expect: Email and Password fields are visible
    - expect: Login button is enabled
  2. Enter registered email 'john.doe@gmail.com' in Email field
    - expect: Email is entered correctly
  3. Enter correct password 'TestPass@123' in Password field
    - expect: Password is entered (masked display)
  4. Click Login button
    - expect: Login is successful
    - expect: User is redirected to dashboard page
    - expect: User name or greeting message is displayed

#### 1.9. User Login - Invalid Email

**File:** `tests/auth/login.invalid-email.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter non-existent email 'nonexistent@gmail.com' in Email field
    - expect: Email is entered
  3. Enter any password in Password field
    - expect: Password is entered
  4. Click Login button
    - expect: Login fails
    - expect: Error message appears: 'Invalid email or password'
    - expect: User remains on login page

#### 1.10. User Login - Wrong Password

**File:** `tests/auth/login.wrong-password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter registered email 'john.doe@gmail.com' in Email field
    - expect: Email is entered
  3. Enter incorrect password 'WrongPass123' in Password field
    - expect: Password is entered
  4. Click Login button
    - expect: Login fails
    - expect: Error message appears: 'Invalid email or password'
    - expect: User remains on login page

#### 1.11. User Login - Empty Email Field

**File:** `tests/auth/login.empty-email.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Leave Email field empty and enter password
    - expect: Email field is empty, password is entered
  3. Click Login button
    - expect: Login fails
    - expect: Error message appears: 'Email is required'
    - expect: User remains on login page

#### 1.12. User Login - Empty Password Field

**File:** `tests/auth/login.empty-password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter email and leave Password field empty
    - expect: Email is entered, password field is empty
  3. Click Login button
    - expect: Login fails
    - expect: Error message appears: 'Password is required'
    - expect: User remains on login page

#### 1.13. User Login - Case Sensitivity in Email

**File:** `tests/auth/login.email-case.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter email with different case 'JOHN.DOE@GMAIL.COM' instead of 'john.doe@gmail.com'
    - expect: Email with different case is entered
  3. Enter correct password and click Login
    - expect: Email case should be handled correctly
    - expect: Login should succeed if case-insensitive
    - expect: Or error if case-sensitive

#### 1.14. Forgot Password - Email Submission

**File:** `tests/auth/forgot-password.spec.ts`

**Steps:**
  1. Navigate to login page and click 'Forgot password?' link
    - expect: Password reset page loads
    - expect: Email field is visible
  2. Enter registered email 'john.doe@gmail.com' in Email field
    - expect: Email is entered
  3. Click 'Send Reset Link' or similar button
    - expect: Password reset email is sent
    - expect: Success message appears: 'Check your email for reset link'

### 2. Dashboard & Product Browsing

**Seed:** `tests/seed.spec.ts`

#### 2.1. Dashboard - Page Load After Login

**File:** `tests/dashboard/dashboard-load.spec.ts`

**Steps:**
  1. Login with valid credentials
    - expect: Dashboard page loads successfully
    - expect: Product list is visible
    - expect: Search bar is displayed
    - expect: Cart icon is visible
    - expect: User profile/logout option is accessible

#### 2.2. Dashboard - View All Products

**File:** `tests/dashboard/view-all-products.spec.ts`

**Steps:**
  1. Navigate to dashboard after login
    - expect: Dashboard loads
    - expect: Products are displayed in grid/list format
  2. Observe the product list
    - expect: Each product shows: product name, price, description, image
    - expect: Products are organized in a scrollable/paginated list
  3. Scroll down to view more products
    - expect: More products load or pagination controls appear
    - expect: All products are accessible

#### 2.3. Dashboard - Product Search Functionality

**File:** `tests/dashboard/search-products.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads with search bar visible
  2. Click on search bar and enter product name 'ADIDAS'
    - expect: Search bar accepts input
    - expect: Product list updates to show matching results
  3. Verify search results
    - expect: Only products matching 'ADIDAS' are displayed
    - expect: Product count is accurate
  4. Clear search and perform new search 'iphone'
    - expect: Search is cleared
    - expect: New search results show 'iphone' products

#### 2.4. Dashboard - Search with No Results

**File:** `tests/dashboard/search-no-results.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads
  2. Search for non-existent product 'XYZABC123NONEXISTENT'
    - expect: Search returns no results
    - expect: Message appears: 'No products found' or similar

#### 2.5. Dashboard - Filter by Price Range

**File:** `tests/dashboard/filter-price.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads with filter options
  2. Apply price filter: minimum $50, maximum $200
    - expect: Filter is applied
    - expect: Only products within price range are displayed
  3. Adjust price range to $100 - $300
    - expect: Products update according to new price range

#### 2.6. Dashboard - Sort Products by Price

**File:** `tests/dashboard/sort-products.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads with sort options
  2. Select 'Sort by Price - Low to High'
    - expect: Products are sorted in ascending price order
  3. Select 'Sort by Price - High to Low'
    - expect: Products are sorted in descending price order
  4. Select 'Sort by Name'
    - expect: Products are sorted alphabetically by name

#### 2.7. Dashboard - View Product Details

**File:** `tests/dashboard/product-details.spec.ts`

**Steps:**
  1. Navigate to dashboard and locate a product
    - expect: Product card is visible with basic info
  2. Click on product name or image to view details
    - expect: Product detail page loads
    - expect: Full product description is displayed
    - expect: All product images are visible
    - expect: Price, rating, reviews are shown
    - expect: 'Add to Cart' button is visible
  3. Review product specifications/details
    - expect: All product information is accurate and complete

### 3. Shopping Cart & Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add to Cart - Single Product

**File:** `tests/cart/add-to-cart-single.spec.ts`

**Steps:**
  1. Navigate to dashboard after login
    - expect: Dashboard loads
  2. Click 'Add to Cart' button on a product (e.g., ADIDAS ORIGINAL product)
    - expect: Product is added to cart
    - expect: Cart count increases by 1
    - expect: Success message or notification appears
  3. Verify cart icon shows updated count
    - expect: Cart badge displays '1' or updated count

#### 3.2. Add to Cart - Multiple Products

**File:** `tests/cart/add-to-cart-multiple.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads
  2. Add first product to cart
    - expect: Product is added, cart count shows 1
  3. Add second product to cart
    - expect: Product is added, cart count shows 2
  4. Add third product to cart
    - expect: Product is added, cart count shows 3
  5. Click cart icon to view cart contents
    - expect: Cart page shows all 3 products
    - expect: Total price is correctly calculated

#### 3.3. Add to Cart - Duplicate Product

**File:** `tests/cart/add-duplicate-product.spec.ts`

**Steps:**
  1. Add a product to cart
    - expect: Product is added, cart count is 1
  2. Add the same product again
    - expect: Product quantity increases to 2, OR new line item is added
    - expect: Cart count shows 2 items

#### 3.4. Remove Product from Cart

**File:** `tests/cart/remove-from-cart.spec.ts`

**Steps:**
  1. Navigate to cart with multiple items
    - expect: Cart shows 3+ items
  2. Click 'Remove' or delete icon on a product
    - expect: Product is removed from cart
    - expect: Cart count decreases
    - expect: Product is no longer visible in cart
  3. Verify total price is recalculated
    - expect: Total reflects the removed product's price

#### 3.5. Update Product Quantity in Cart

**File:** `tests/cart/update-quantity.spec.ts`

**Steps:**
  1. Navigate to cart with items
    - expect: Cart displays items with quantity field
  2. Change quantity of a product from 1 to 3
    - expect: Quantity field updates to 3
    - expect: Cart total is recalculated
    - expect: Total reflects new quantity
  3. Reduce quantity from 3 to 1
    - expect: Quantity updates to 1
    - expect: Total is recalculated

#### 3.6. Clear Cart

**File:** `tests/cart/clear-cart.spec.ts`

**Steps:**
  1. Navigate to cart with multiple items
    - expect: Cart shows 3+ items
  2. Click 'Clear Cart' or 'Empty Cart' button
    - expect: All items are removed
    - expect: Cart shows 'Cart is empty' message
    - expect: Cart total shows $0

#### 3.7. Proceed to Checkout

**File:** `tests/cart/proceed-checkout.spec.ts`

**Steps:**
  1. Navigate to cart with items
    - expect: Cart shows items and total price
  2. Click 'Proceed to Checkout' button
    - expect: Checkout page loads
    - expect: Shipping address form is visible
    - expect: Payment method section is visible

#### 3.8. Checkout - Enter Shipping Address

**File:** `tests/cart/checkout-shipping.spec.ts`

**Steps:**
  1. Proceed to checkout with items in cart
    - expect: Checkout page loads
  2. Enter shipping address: '123 Main St, New York, NY 10001, USA'
    - expect: Address is entered in all fields (street, city, state, zip, country)
  3. Verify address fields are filled correctly
    - expect: All address fields display entered data

#### 3.9. Checkout - Select Payment Method

**File:** `tests/cart/checkout-payment.spec.ts`

**Steps:**
  1. Proceed to checkout with shipping address entered
    - expect: Checkout page shows payment section
  2. Select 'Credit Card' or available payment method
    - expect: Payment method is selected
    - expect: Payment form appears (card details, expiry, CVV, etc.)

#### 3.10. Checkout - Place Order

**File:** `tests/cart/checkout-place-order.spec.ts`

**Steps:**
  1. Complete checkout with valid address and payment details
    - expect: All checkout fields are filled
  2. Click 'Place Order' button
    - expect: Order is processed
    - expect: Order confirmation page appears
    - expect: Order number is displayed
    - expect: Confirmation email indication is shown

#### 3.11. Checkout - Missing Shipping Address

**File:** `tests/cart/checkout-missing-address.spec.ts`

**Steps:**
  1. Proceed to checkout
    - expect: Checkout page loads
  2. Leave shipping address fields empty and proceed to payment
    - expect: Error message appears: 'Address is required'
    - expect: User cannot proceed without address

#### 3.12. Checkout - Invalid Shipping Address

**File:** `tests/cart/checkout-invalid-address.spec.ts`

**Steps:**
  1. Proceed to checkout
    - expect: Checkout page loads
  2. Enter incomplete address missing zip code or state
    - expect: Address fields are filled incompletely
  3. Click Place Order
    - expect: Error message appears for missing fields
    - expect: User remains on checkout page

#### 3.13. Checkout - Invalid Credit Card

**File:** `tests/cart/checkout-invalid-card.spec.ts`

**Steps:**
  1. Complete shipping address on checkout page
    - expect: Address is filled
  2. Enter invalid credit card number '1234 5678 9012 3456' in payment section
    - expect: Card number is entered
  3. Click Place Order
    - expect: Order fails
    - expect: Error message appears: 'Invalid card number'
    - expect: Payment details are highlighted

#### 3.14. Checkout - Apply Coupon Code

**File:** `tests/cart/checkout-coupon.spec.ts`

**Steps:**
  1. Navigate to checkout page with items
    - expect: Checkout page loads
    - expect: Coupon code input field is visible
  2. Enter valid coupon code 'DISCOUNT10'
    - expect: Coupon code is entered
  3. Click 'Apply' button
    - expect: Coupon is applied
    - expect: Discount is reflected in total
    - expect: Discount amount is shown

#### 3.15. Checkout - Invalid Coupon Code

**File:** `tests/cart/checkout-invalid-coupon.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Enter invalid coupon code 'INVALIDCODE123'
    - expect: Code is entered
  3. Click 'Apply' button
    - expect: Error message appears: 'Invalid coupon code'
    - expect: Total price remains unchanged

### 4. Order Management & History

**Seed:** `tests/seed.spec.ts`

#### 4.1. View Order Confirmation

**File:** `tests/orders/order-confirmation.spec.ts`

**Steps:**
  1. Complete order placement successfully
    - expect: Order confirmation page displays
    - expect: Order number is shown (e.g., 'Order #123456')
    - expect: Order date and time are displayed
    - expect: Shipping address is confirmed
  2. Review order summary
    - expect: All ordered products are listed
    - expect: Quantities are correct
    - expect: Final total amount is displayed

#### 4.2. View Order History

**File:** `tests/orders/order-history.spec.ts`

**Steps:**
  1. Login to account and navigate to 'Orders' or 'Order History' section
    - expect: Order history page loads
    - expect: List of past orders is displayed
  2. Review order list
    - expect: Each order shows: order number, date, status, total amount
    - expect: Orders are listed in reverse chronological order (newest first)
  3. Click on an order to view details
    - expect: Order details page opens
    - expect: Products in order are listed
    - expect: Order status is shown
    - expect: Tracking information is available if shipped

#### 4.3. Order Status - Pending

**File:** `tests/orders/order-status-pending.spec.ts`

**Steps:**
  1. View a newly placed order
    - expect: Order status shows 'Pending' or 'Processing'
    - expect: Expected delivery date is displayed

#### 4.4. Order Status - Shipped

**File:** `tests/orders/order-status-shipped.spec.ts`

**Steps:**
  1. View an order that has been shipped
    - expect: Order status shows 'Shipped'
    - expect: Tracking number is displayed
    - expect: Estimated delivery date is shown
  2. Click on tracking number
    - expect: Tracking information or external tracking page loads
    - expect: Package location/status is visible

#### 4.5. Order Status - Delivered

**File:** `tests/orders/order-status-delivered.spec.ts`

**Steps:**
  1. View a completed order
    - expect: Order status shows 'Delivered'
    - expect: Delivery date is displayed

#### 4.6. Download Invoice

**File:** `tests/orders/download-invoice.spec.ts`

**Steps:**
  1. View order details
    - expect: Order details page loads
  2. Click 'Download Invoice' or 'Download PDF' button
    - expect: Invoice PDF is generated and downloaded
    - expect: File name shows order number
  3. Verify downloaded invoice
    - expect: Invoice contains: order number, date, products, quantity, price, total
    - expect: Invoice is in PDF format and readable

#### 4.7. Cancel Order - Before Shipment

**File:** `tests/orders/cancel-order-pending.spec.ts`

**Steps:**
  1. View a pending order (status: 'Processing')
    - expect: Order details are displayed
  2. Click 'Cancel Order' button
    - expect: Confirmation dialog appears: 'Are you sure you want to cancel?'
  3. Confirm cancellation
    - expect: Order is cancelled
    - expect: Status changes to 'Cancelled'
    - expect: Refund is initiated

#### 4.8. Cannot Cancel Order - After Shipment

**File:** `tests/orders/cannot-cancel-shipped.spec.ts`

**Steps:**
  1. View a shipped order (status: 'Shipped')
    - expect: Order details are displayed
  2. Look for 'Cancel Order' button
    - expect: Cancel button is disabled or not visible
    - expect: Message appears: 'Order cannot be cancelled as it has been shipped'

#### 4.9. Return Order - Request Return

**File:** `tests/orders/return-request.spec.ts`

**Steps:**
  1. View a delivered order
    - expect: Order details page loads
    - expect: 'Return' or 'Return Request' button is visible
  2. Click 'Return Request' button
    - expect: Return request form appears
  3. Select products to return and enter reason 'Product is damaged'
    - expect: Products are selected
    - expect: Return reason is entered
  4. Submit return request
    - expect: Return request is submitted
    - expect: Status changes to 'Return Requested'
    - expect: Return tracking number is provided

### 5. User Profile & Account Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. View Profile Information

**File:** `tests/profile/view-profile.spec.ts`

**Steps:**
  1. Login and navigate to Profile or Account Settings
    - expect: Profile page loads
    - expect: User information is displayed: name, email, phone, address

#### 5.2. Edit Profile - Change Phone Number

**File:** `tests/profile/edit-phone.spec.ts`

**Steps:**
  1. Navigate to profile page
    - expect: Profile page loads
  2. Click 'Edit' button next to phone number
    - expect: Phone field becomes editable
  3. Change phone number from '9876543210' to '9988776655'
    - expect: Phone number is updated in the field
  4. Click 'Save' button
    - expect: Changes are saved
    - expect: Success message appears: 'Profile updated successfully'

#### 5.3. Edit Profile - Change Address

**File:** `tests/profile/edit-address.spec.ts`

**Steps:**
  1. Navigate to profile page
    - expect: Profile page loads with address section
  2. Click 'Edit' button for address
    - expect: Address fields become editable
  3. Update address to '456 Oak Avenue, Los Angeles, CA 90001'
    - expect: Address is updated
  4. Click 'Save' button
    - expect: Changes are saved
    - expect: New address is displayed in profile

#### 5.4. Change Password

**File:** `tests/profile/change-password.spec.ts`

**Steps:**
  1. Navigate to Account Settings or Security section
    - expect: Settings page loads
  2. Click 'Change Password' button
    - expect: Password change form appears with: Current Password, New Password, Confirm Password fields
  3. Enter current password 'TestPass@123'
    - expect: Current password is entered
  4. Enter new password 'NewPass@456' in New Password field
    - expect: New password is entered
  5. Enter same password in Confirm Password field
    - expect: Confirm password is entered
  6. Click 'Update Password' button
    - expect: Password is changed
    - expect: Success message appears: 'Password changed successfully'

#### 5.5. Change Password - Wrong Current Password

**File:** `tests/profile/change-password-wrong.spec.ts`

**Steps:**
  1. Navigate to password change page
    - expect: Password change form appears
  2. Enter incorrect current password 'WrongPass@123'
    - expect: Incorrect password is entered
  3. Enter new password and confirm
    - expect: New passwords are entered
  4. Click 'Update Password' button
    - expect: Error message appears: 'Current password is incorrect'
    - expect: Password is not changed

#### 5.6. Add Alternative Address

**File:** `tests/profile/add-alt-address.spec.ts`

**Steps:**
  1. Navigate to address management section
    - expect: Address list is displayed
  2. Click 'Add New Address' button
    - expect: Address form appears
  3. Enter address details and mark as 'Billing Address' or 'Shipping Address'
    - expect: Address form is filled
  4. Click 'Save Address' button
    - expect: New address is added to address list
    - expect: Address can be selected during checkout

#### 5.7. Delete Address

**File:** `tests/profile/delete-address.spec.ts`

**Steps:**
  1. Navigate to address management with multiple addresses
    - expect: Multiple addresses are listed
  2. Click 'Delete' button on an address
    - expect: Confirmation dialog appears
  3. Confirm deletion
    - expect: Address is deleted
    - expect: Address is removed from list

#### 5.8. Logout

**File:** `tests/profile/logout.spec.ts`

**Steps:**
  1. Click on user profile icon or menu and select 'Logout'
    - expect: User is logged out
    - expect: User is redirected to login page
    - expect: Session is cleared
  2. Try to access dashboard without logging in again
    - expect: Access is denied
    - expect: User is redirected to login page

### 6. Performance & Security

**Seed:** `tests/seed.spec.ts`

#### 6.1. Page Load Time - Dashboard

**File:** `tests/performance/dashboard-load-time.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Dashboard loads within 3 seconds
    - expect: All content is rendered and visible

#### 6.2. Session Timeout

**File:** `tests/security/session-timeout.spec.ts`

**Steps:**
  1. Login to account and navigate to dashboard
    - expect: Dashboard loads
  2. Wait for session timeout period (typically 15-30 minutes) without activity
    - expect: Session expires
    - expect: User is logged out automatically
  3. Try to access dashboard
    - expect: User is redirected to login page
    - expect: Message appears: 'Your session has expired'

#### 6.3. HTTPS Security

**File:** `tests/security/https.spec.ts`

**Steps:**
  1. Navigate to application URL
    - expect: Application uses HTTPS protocol
    - expect: URL shows 'https://' and padlock icon
  2. Verify SSL certificate
    - expect: SSL certificate is valid
    - expect: No security warnings appear

#### 6.4. Password Strength Validation

**File:** `tests/security/password-strength.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration form loads
  2. Enter weak password 'password' in password field
    - expect: Password strength indicator shows 'Weak'
    - expect: Warning message appears
  3. Enter strong password 'Str0ng!P@ss' in password field
    - expect: Password strength indicator shows 'Strong'

#### 6.5. Cross-Site Scripting (XSS) Protection

**File:** `tests/security/xss-protection.spec.ts`

**Steps:**
  1. Navigate to registration page
    - expect: Registration form loads
  2. Enter XSS payload in First Name field: '<script>alert("XSS")</script>'
    - expect: Script tag is entered as text, not executed
    - expect: No alert appears
    - expect: Script is treated as normal text
  3. Submit registration
    - expect: Script is safely escaped or rejected
    - expect: No XSS vulnerability is exploited

### 7. Edge Cases & Boundary Tests

**Seed:** `tests/seed.spec.ts`

#### 7.1. Very Long Product Name in Search

**File:** `tests/edge-cases/long-search-string.spec.ts`

**Steps:**
  1. Navigate to dashboard
    - expect: Dashboard loads
  2. Enter very long search string (100+ characters): 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    - expect: Search field accepts input
    - expect: System handles long string gracefully
  3. Execute search
    - expect: Search completes without error
    - expect: Message shows 'No products found' or returns no results

#### 7.2. Cart with Maximum Products

**File:** `tests/edge-cases/max-cart-items.spec.ts`

**Steps:**
  1. Add 50+ different products to cart
    - expect: System allows adding many items
    - expect: Cart count increases correctly
  2. View cart with 50+ items
    - expect: Cart loads without performance issues
    - expect: All items are listed correctly
    - expect: Total is calculated accurately

#### 7.3. Product with Zero Price

**File:** `tests/edge-cases/zero-price-product.spec.ts`

**Steps:**
  1. Search for or navigate to product with $0 price
    - expect: Product is displayed with price '$0.00'
  2. Add product to cart
    - expect: Product is added successfully
    - expect: Cart total is calculated correctly
  3. Proceed to checkout
    - expect: Checkout allows free order
    - expect: Total shows $0.00

#### 7.4. Quantity Beyond Available Stock

**File:** `tests/edge-cases/quantity-beyond-stock.spec.ts`

**Steps:**
  1. View product with 5 items in stock
    - expect: Product availability is shown
  2. Try to add quantity 10 (beyond available)
    - expect: System prevents quantity beyond stock
    - expect: Error message appears: 'Only 5 items available'
    - expect: Quantity is capped at 5 or reverted

#### 7.5. Negative Price Display

**File:** `tests/edge-cases/negative-price.spec.ts`

**Steps:**
  1. Navigate to cart with discount applied
    - expect: Cart shows discounted prices correctly
  2. Verify that total never shows negative amount
    - expect: Total is always zero or positive
    - expect: System prevents negative totals

#### 7.6. Special Characters in Address

**File:** `tests/edge-cases/special-chars-address.spec.ts`

**Steps:**
  1. Navigate to checkout
    - expect: Checkout page loads
  2. Enter address with special characters: '123 O'Malley's Lane & Street #5-A, New York'
    - expect: Special characters are accepted
  3. Place order
    - expect: Order is placed successfully
    - expect: Address is saved correctly with special characters

#### 7.7. Concurrent Requests - Multiple Tabs

**File:** `tests/edge-cases/concurrent-requests.spec.ts`

**Steps:**
  1. Open application in multiple browser tabs
    - expect: Multiple sessions are active
  2. Add product to cart in Tab 1
    - expect: Product is added in Tab 1
  3. Refresh Tab 2 and check cart
    - expect: Cart should reflect latest state
    - expect: Either show same product or respect session isolation
