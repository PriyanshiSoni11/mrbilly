# Restaurant Management System : Mr.Billy the Biller

## Overview

The **Mr.Billy** is an all-in-one solution for managing restaurants efficiently. It includes features for menu management, order taking, kitchen workflows, and comprehensive order tracking. Designed for seamless usability, it enhances the customer experience while simplifying orders.

---

## Features

### Authentication
- **Login Page**: Allows users to log in or navigate to the sign-up page.
- **Register Page**: Enables new users to sign up with personal and restaurant details.

### Menu Management
- **Profile Page**: For users without an existing menu, it offers the option to create one.
- **Menu Add Page**:
  - Add menus with customizable groups and items.
  - Features to add/remove/modify/expand/collapse groups.
  - Item details include price, vegetarian status, availability, calories, and description.
  - Save multiple menus and select one for active use.
- **Home Page**:
  - View all added menus and the currently selected menu.
  - Change the active menu and prepare for order-taking.

### Order Management
- **Order Taking Page**:
  - View groups and corresponding item cards from the selected menu.
  - Add items to the order summary, adjust quantities, and remove items.
  - Specify table number and order type (online, parcel, or dining).
  - Mark orders as paid and save them.
- **Order View Page**:
  - Display orders as cards with detailed information: Order id, item name, table number, order type, quantity, price, payment status and total.
  - Monitor item statuses (cooking, ordered, or ready).
  - Modify orders and mark them as complete (orders disappear after being marked complete).
  - Track elapsed time since order placement.

### Kitchen View
- Designed for chefs and waiters:
  - Drag and drop items to update their statuses.
  - Real-time synchronization with the Order View for state updates.

### Order History
- View a list of past and current orders.
- Apply filters to analyze order history.

---

## Tech Stack

- **Frontend**: ejs
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas for cloud hosting)
- **Authentication**: JWT-based authentication for secure access and bcrypt for storing passwords
- **Hosting**: vercel

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PriyanshiSoni11/mrbilly.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=3000
   MONGOOSE_CONNECT_SERVER=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   EXPRESS_SESSION_SECRET = your_secret_key
   SERCATE_KEY = your_secret_key
   ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Visit `http://localhost:3000` in your browser.
   Or direclty visit https://mrbillythebiller.vercel.app/

---

## Usage

1. **Create a Menu**:
   - Log in and navigate to the profile page to create your first menu.
   - Add groups and items to the menu with details like price, vegetarian status, and availability.

2. **Take Orders**:
   - Select a menu and start taking orders.
   - Add items to the order summary and customize details like table number and order type.

3. **Monitor and Manage Orders**:
   - View live orders, adjust item statuses, and track order completion times.
   - Use the kitchen view for seamless coordination between chefs and staff.

4. **Analyze Order History**:
   - Check past orders with filtering options to gain insights into restaurant performance.

---

## Future Enhancements

- **Mobile App Support**: Expand to Android and iOS platforms for staff and customer use.
- **AI Menu Recommendations**: Suggest items based on customer preferences and order history.
- **Reporting and Analytics**: Add advanced analytics for sales and inventory management.
- **Multilingual Support**: Provide language options for better accessibility.

---

## Contributing

Contributions are welcome! Please fork the repository, make changes, and submit a pull request. For major changes, open an issue first to discuss your ideas.

---

## License

NA, only free versions are being used

---

## Contact

For inquiries or support:
- Email: [email](soni.priyans@example.com)
- GitHub: [github profile](https://github.com/PriyanshiSoni11)
