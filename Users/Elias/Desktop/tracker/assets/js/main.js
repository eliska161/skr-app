/**
 * Norwegian Order Tracking System
 * Main JavaScript file for shared functionality
 */

// Get all orders from localStorage
function getAllOrders() {
    const ordersData = localStorage.getItem('orderData');
    return ordersData ? JSON.parse(ordersData) : [];
}

// Get order by ID
function getOrderById(id) {
    const orders = getAllOrders();
    return orders.find(order => order.id === id);
}

// Get orders by email
function getOrdersByEmail(email) {
    const orders = getAllOrders();
    return orders.filter(order => order.email.toLowerCase() === email.toLowerCase());
}

// Generate a unique ID for orders
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Initialize the database with test data if empty
function initializeDatabase() {
    const orders = getAllOrders();
    
    if (orders.length === 0) {
        // Add some test data
        const testOrders = [
            {
                id: generateId(),
                name: 'Ola Nordmann',
                email: 'ola@example.com',
                receiptNumber: 'NO-10001',
                status: 'shipped',
                comment: 'Takk for bestillingen!',
                receivedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                productionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                shippedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                trackingNumber: 'TRACK-12345',
                zipCode: '0001',
                city: 'Oslo'
            },
            {
                id: generateId(),
                name: 'Kari Hansen',
                email: 'kari@example.com',
                receiptNumber: 'NO-10002',
                status: 'production',
                comment: 'Din bestilling er i produksjon.',
                receivedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
                productionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            },
            {
                id: generateId(),
                name: 'Johan Berg',
                email: 'johan@example.com',
                receiptNumber: 'NO-10003',
                status: 'received',
                comment: 'Vi har mottatt din bestilling.',
                receivedDate: new Date().toISOString() // Today
            }
        ];
        
        localStorage.setItem('orderData', JSON.stringify(testOrders));
    }
}

// Run initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDatabase();
});