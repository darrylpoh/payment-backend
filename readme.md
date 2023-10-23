
# Corepay was done as a Hackathon submission for Tiktok 


# Corepay

## Empowering underserved communities with CorePay: A mobile digital wallet that enables everyone to withdraw or deposit via cash or card, and transact across borders in multiple currencies. [https://devpost.com/software/null-7idl3g]

Done by: 

[Bernice Teo](https://github.com/bernicesmu)

[Darryl Poh](https://github.com/darrylpoh)

[Jowett Chng](https://github.com/JowettC)

[Tan Yee Sen](https://github.com/ystan98)

[Au Yeong Wei Bin](https://github.com/auyeongweibin)

## Our inspiration
Our aim is to empower underserved communities by addressing the challenges they face due to limited access to financial services. We aim to revolutionize financial services with CorePay, facilitating cash deposits and withdrawals without ATMs, standard e-wallet features, and multi-currency support, fostering financial inclusion and convenience for all. The following are the goals that our team focuses on:

🚀 Fostering Financial Inclusion At its core, CorePay is committed to fostering financial inclusion. We believe that everyone, regardless of their location or financial background, should have access to secure and convenient financial services. Our solution strives to bridge the gap between people and their finances, ensuring financial empowerment is within reach.

📈 Empowering Underserved Communities CorePay's mission is to empower underserved communities by offering a reliable and user-friendly financial platform. Through innovative technology and a commitment to accessibility, we aim to improve the financial well-being of individuals and communities worldwide.

## What it does
CorePay is designed to simplify and enhance the way people manage their finances. Our solution addresses the common challenges faced by underserved communities due to limited access to financial infrastructure or services, and empowers individuals with a range of innovative features:

🌐 Cash Transactions Without ATMs CorePay enables users to perform cash transactions independent from traditional ATMs. Whether users need to withdraw or deposit cash, our platform offers a seamless and convenient alternative. Visit our media gallery or watch our video below to find out more!

💰 Standard E-Wallet Features In addition to cash transactions, CorePay provides essential e-wallet functionalities. Users can effortlessly top up their accounts and perform basic fund transfers to others, all within a user-friendly interface.

🌍 Multi-Currency Support To cater to a diverse user base, CorePay supports multi-currency transactions. Users can easily transfer funds of another currency with other wallet users, making cross-border transactions more accessible and cost-effective.

## How we built it
At CorePay, we leveraged a powerful stack of technologies to create a seamless and secure financial solution for our users:

Frontend Development

React JS: We chose React for our frontend development to build interactive and user-friendly interfaces.

Material-UI: Used for the standardisation of user interface components.

Firebase Hosting: Our frontend is hosted on Firebase, ensuring fast loading times and reliable accessibility for users.

Backend Development

Node JS: We used Node.js to power our backend, providing the foundation for server-side operations and data management.

Express JS: A robust and flexible web application framework for Node.js, played a pivotal role in building our API and handling HTTP requests.

Firebase Functions (Serverless): Firebase Functions allowed us to implement serverless architecture, ensuring scalability and cost-efficiency while handling backend processes.

Firebase Authentication (OAuth 2.0): To secure user data and authenticate users, we implemented Firebase Authentication, which utilizes OAuth 2.0 for seamless and secure user logins.

Payment Integration

Stripe API: We integrated the Stripe API into CorePay to facilitate secure payment transactions and ensure the safety of financial data.
Security considerations

Email OTP: An added layer of security when logging in that mitigates identity theft and unauthorised transactions, providing an ease of mind to the user.

Machine Learning for Anomaly Detection: Isolation forest, a machine learning algorithm, was used to detect anomaly transaction.

Scalability and availability considerations

Kubernetes: To ensure that our application is able to serve all our users in a timely manner, we intend to employ Kubernetes, a container orchestration service, which helps us to automatically scale our services according to the number of users we need to serve at any point of time. Additionally Kubernetes can also help with ensuring that our systems are fault tolerant, by having redundancy and data replication, in order for us to be able to recover well from failing services, all while maintaining the user's experience.

## Some notable features were

1. Login function with OTP
<img width="267" alt="Screenshot 2023-10-23 at 11 10 33 PM" src="https://github.com/darrylpoh/payment-backend/assets/64519963/d12c38c6-5213-469a-94e0-e7f9fce208d9">

2. Personalised QR code for transfer
<img width="268" alt="Screenshot 2023-10-23 at 11 10 55 PM" src="https://github.com/darrylpoh/payment-backend/assets/64519963/e84808fd-2548-4cb0-990f-76585e252201">

3. Stripe API 
<img width="259" alt="Screenshot 2023-10-23 at 11 11 14 PM" src="https://github.com/darrylpoh/payment-backend/assets/64519963/970b6ddc-a5e3-41bf-856c-3bc5044276b1">


## Instructions to run the backend codes (in the `/backend` folder)
1. run `npm install` to install all the dependencies
2. create `.env` and `credential.json` file in the `/backend` directory 
3. run `npm run start` to start the backend server

## Instructions to run the frontend codes (in the `/wallet_frontend` folder)
1. run `npm install` if you haven't done so for backend
2. To start the development server and run the web page locally, run `npm run start`

## User Test Account
- Please use this test account in our app
- Email: user3@test.com
- Password: user3pw
- OTP: Any 6-digits

## Testing of the Stripe API 
- Email: Any valid email (e.g. test@gmail.com)
- Card number: 4242 4242 4242 4242
- Expiry date: Any valid future date (e.g. 12/34) 
- CVC: Any 3-digit number (or 4-digit for American Express card) (e.g. 123)
- Name: Any (e.g. John Smith)
