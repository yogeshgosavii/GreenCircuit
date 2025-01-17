import Cookies from 'js-cookie';

class Service {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = Cookies.get('token');
    }

    async createRequest(requestData) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                },
                body: JSON.stringify(requestData)
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to create request');
            }
        } catch (error) {
            console.error('Error creating request:', error);
            throw error;
        }
    }

    async updateRequest(requestId, requestData) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/requests/${requestId}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                },
                body: JSON.stringify(requestData)
            });
            if (response.ok) {
                return 'Request updated successfully';
            } else {
                throw new Error('Failed to update request');
            }
        } catch (error) {
            console.error('Error updating request:', error);
            throw error;
        }
    }

    async deleteRequest(requestId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/users/requests/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                }
            });
            if (response.ok) {
                return 'Request deleted successfully';
            } else {
                throw new Error('Failed to delete request');
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            throw error;
        }
    }

    async getRequests({query="Applied"}) {
       
        console.log(this.token);
        try {
            const response = await fetch(`${this.baseUrl}/api/users/requests?${query.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                }
            });
            if (response.ok) {
                const data = await response.json()
                console.log(data);
                return data;
            } else {
                throw new Error('Failed to get requests');
            }
        } catch (error) {
            console.error('Error getting requests:', error);
            throw error;
        }
    }

    async getOrganizations(search = 'any') {
        try {
        
        
            
            const response = await fetch(`${this.baseUrl}/api/users/organizations?search=${search}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                }
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get organizations');
            }
        } catch (error) {
            console.error('Error getting organizations:', error);
            throw error;
        }
    }

    async getOrganizationDetails(organizationId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/organizations/${organizationId}/details`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}` // Include the token in the Authorization header
                }
            });
    
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to get organization details');
            }
        } catch (error) {
            console.error('Error getting organization details:', error);
            throw error;
        }
    }
    

}

const service = new Service('http://localhost:8080'); 
export default service;
