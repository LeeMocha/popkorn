import { useState, useEffect } from 'react';
import './customerservice.css';

export const Customerservice = () => {
    const [selectedCategory, setSelectedCategory] = useState('Delivery');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const categories = ['Delivery', 'Order', 'Membership', 'Exchange & Return'];
    const faqData = {
        'Delivery': [
            { question: '질문1', answer: '답1' },
            { question: '질문2', answer: '답2' },
            { question: '질문3', answer: '답3' },
            { question: '질문4', answer: '답4' },
            { question: '질문5', answer: '답5' }
        ],
        'Order': [
            { question: '질문1', answer: '답1' },
            { question: '질문2', answer: '답2' },
            { question: '질문3', answer: '답3' },
            { question: '질문4', answer: '답4' },
            { question: '질문5', answer: '답5' }
        ],
        'Membership': [
            { question: '질문1', answer: '답1' },
            { question: '질문2', answer: '답2' },
            { question: '질문3', answer: '답3' },
            { question: '질문4', answer: '답4' },
            { question: '질문5', answer: '답5' }
        ],
        'Exchange & Return': [
            { question: '질문1', answer: '답1' },
            { question: '질문2', answer: '답2' },
            { question: '질문3', answer: '답3' },
            { question: '질문4', answer: '답4' },
            { question: '질문5', answer: '답5' }
        ]
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedQuestion(null);
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(selectedQuestion === question ? null : question);
    };

    useEffect(() => {
        setSelectedQuestion(null);
    }, [selectedCategory]);

    return (
        <div className="customerservicewhole">
            <div className="account-header">
                Customer Service
            </div>
            <div className="customerserviceheader">
                Frequently Asked Questions
            </div>
            <div className='frequentlyaskedcategory'>
                {categories.map((category, index) => (
                    <div key={index} className={`frequentlyaskedcategory${index + 1} ${selectedCategory === category ? 'selectedCategory' : ''}`} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </div>
                ))}
            </div>

            {faqData[selectedCategory].map((faq, index) => (
                <div key={index}>
                    <button className='askservicebtn' onClick={() => handleQuestionClick(faq.question)}>
                        <span className='contentsmallheader'>{index + 1}</span>&nbsp;&nbsp;&nbsp;
                        {faq.question}
                    </button>
                    <div className='askservicecontent' style={{ display: selectedQuestion === faq.question ? 'block' : 'none' }}>
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Customerservice;
