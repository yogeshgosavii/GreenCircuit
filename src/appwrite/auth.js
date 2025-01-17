import Cookies from 'js-cookie';

class AuthService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async login({ email, password }) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
    
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
    
            const data = await response.json();
            
            if (data.jwtToken) {
                // Set the token as a cookie only if it exists in the response
                Cookies.set('token', data.jwtToken);
            } else {
                throw new Error('Token not found in response');
            }
    
            return data.jwtToken;
        } catch (error) {
            throw error;
        }
    }
    

    async signup(userData, userAadhaarImage) {
        const formData = new FormData();
        console.log(userAadhaarImage);
     
    
        try {
            const response = await fetch(`${this.baseUrl}/api/users/register`, {
                method: "POST",
                body: JSON.stringify(userData), 
                headers : {
                    "Content-Type" : "application/json"
                }
            
            });
    
            if (!response.ok) {
                throw new Error('Signup failed');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async createOrganization(userData){
        
     
    
        try {
            const response = await fetch(`${this.baseUrl}/api/users/organization/register`, {
                method: "POST",
                body: JSON.stringify(userData), 
                headers : {
                    "Content-Type" : "application/json"
                }
            
            });
    
            if (!response.ok) {
                throw new Error('Signup failed');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    
    

    async checkEmailAvailability(email) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/check-email?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            if (response.ok) {
                return await response.text(); // Return the response body
            } else {
                throw new Error('Failed to check email availability');
            }
        } catch (error) {
            console.error('Error checking email availability:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // Retrieve the token from the cookie
            const token = Cookies.get('token');
    
            // Fetch user data from the API
            const response = await fetch(`${this.baseUrl}/api/users/current-user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
    
            // Parse the response body as JSON
            const userData = await response.json();
    
            // Return the user data
            return userData;
        } catch (error) {
            // If an error occurs during the process, throw it
            throw error;
        }
    }
    

    async logout() {
        try {
            // Remove the token cookie
            Cookies.remove('token');
            // Redirect to the login page or perform any other necessary actions
            window.location.href = '/login';
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService('http://localhost:8080');
export default authService;
