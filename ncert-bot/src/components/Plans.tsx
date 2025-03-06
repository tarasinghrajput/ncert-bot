import React from "react";
import { useNavigate } from "react-router-dom";

const Plans: React.FC = () => {
    const navigate = useNavigate();

    const handleMonthlyPlanClick = () => {
        // Redirect to Stripe Payment Link
        window.location.href = "https://buy.stripe.com/test_dR6cOmezo4ixcq4bII";
    };

    const handleFreePlanClick = () => {
        // Navigate to ProductListing1 page
        navigate("/product-listing-1");
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Pricing Plans</h1>

            <div style={styles.cardContainer}>
                {/* Free Plan Card */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Free Plan 🆓</h2>
                    <ul style={styles.featuresList}>
                        <li>✅ Access to limited NCERT solutions</li>
                        <li>✅ Basic Q&A support</li>
                        <li>✅ Limited daily questions</li>
                        <li>✅ No ads</li>
                        <li>❌ No offline access</li>
                        <li>❌ No premium content</li>
                    </ul>
                    <p style={styles.price}>Price: <strong>₹0/month</strong></p>
                    <p style={styles.bestFor}>🔹 Best for students who need occasional help</p>
                    <button
                        onClick={handleFreePlanClick}
                        style={styles.freeButton}
                    >
                        Choose Free Plan
                    </button>
                </div>

                {/* Monthly Subscription Plan Card */}
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Monthly Subscription Plan 💎</h2>
                    <ul style={styles.featuresList}>
                        <li>✅ Full access to all NCERT solutions</li>
                        <li>✅ Unlimited Q&A support</li>
                        <li>✅ No daily question limit</li>
                        <li>✅ Ad-free experience</li>
                        <li>✅ Downloadable PDFs for offline use</li>
                        <li>✅ Premium study materials & quizzes</li>
                    </ul>
                    <p style={styles.price}>Price: <strong>₹99/month</strong></p>
                    <p style={styles.bestFor}>🔹 Best for students who need full access & premium features</p>
                    <button
                        onClick={handleMonthlyPlanClick}
                        style={styles.premiumButton}
                    >
                        Choose Monthly Plan
                    </button>
                </div>
            </div>

            {/* Back to Home Button */}
            <div style={styles.backButtonContainer}>
                <button style={styles.backButton} onClick={() => navigate("/")}>
                    ⬅ Back to Home
                </button>
            </div>
        </div>
    );
};

// Styling (unchanged)
const styles = {
    container: {
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "'Arial', sans-serif",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    cardContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginTop: "20px",
        flexWrap: "wrap",
    },
    card: {
        border: "1px solid #ddd",
        padding: "25px",
        borderRadius: "12px",
        width: "300px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
    },
    cardTitle: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#007bff",
        textAlign: "center",
    },
    featuresList: {
        listStyle: "none",
        padding: 0,
        fontSize: "16px",
        lineHeight: "1.8",
    },
    price: {
        fontSize: "18px",
        fontWeight: "bold",
        marginTop: "10px",
        textAlign: "center",
        color: "#28a745",
    },
    bestFor: {
        fontSize: "14px",
        color: "#555",
        fontStyle: "italic",
        textAlign: "center",
    },
    freeButton: {
        backgroundColor: "#28a745",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "100%",
        fontSize: "16px",
        marginTop: "15px",
    },
    premiumButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "100%",
        fontSize: "16px",
        marginTop: "15px",
    },
    backButtonContainer: {
        marginTop: "30px",
    },
    backButton: {
        backgroundColor: "#6c757d",
        color: "white",
        padding: "12px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default Plans;