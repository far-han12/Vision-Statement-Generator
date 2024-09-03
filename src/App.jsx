import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';  // Import useForm hook
import axios from 'axios';
import ReactMarkdown from "react-markdown";
import { motion } from 'framer-motion';
import { RiAiGenerate } from "react-icons/ri";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import './button.css';
import './h1.css';

const Loader = () => {
    return (
        <motion.div
            className="flex justify-center items-center my-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
            <FontAwesomeIcon icon={faRobot} beatFade style={{ color: "#289ad5", fontSize: '100px', }} />
        </motion.div>
    );
};

const App = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();  // Initialize useForm and destructure needed methods
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [wordLimit, setWordLimit] = useState(100);
    const [lineLimit, setLineLimit] = useState(5);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const generateVisionStatement = async (data) => {
        setGeneratingAnswer(true);
        setAnswer("");

        try {
            const combinedQuestions = Object.values(data).join(" ");
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
                    import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
                }`,
                method: "post",
                data: {
                    contents: [{
                        parts: [{
                            text: `The following are key insights and information provided by the user:
\n${combinedQuestions}
\nUsing this information, please generate a detailed vision statement for the user's organization. The vision statement should clearly articulate the user's aspirations, core values, and long-term goals, and should be crafted to inspire stakeholders, employees, and customers. The statement should also reflect how the user intends to differentiate their organization within their industry and make a meaningful impact in their community.
\nPlease adhere to the following constraints:
1. The vision statement must be exactly ${wordLimit} words.
2. The vision statement must be exactly ${lineLimit} lines.
3. Prioritize the word limit by making each line longer and filled with more content, ensuring that the lines are balanced and dense with information.
\nEnsure the vision statement is concise, powerful, and meets these exact specifications. If necessary, adjust the phrasing to maintain the balance between the word and line limits.`

                        }]
                    }],
                },
            });

            setAnswer(response.data.candidates[0].content.parts[0].text);

        } catch (error) {
            console.log(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        }

        setGeneratingAnswer(false);
    };

    return (
        <div className='mt-8 mx-auto md:px-10 lg:px-14 font-roboto'>
            <motion.label
                className="flex cursor-pointer gap-2 mx-auto my-5 justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input type="checkbox" onChange={handleToggle} value="dark" checked={theme === "dark"} className="toggle theme-controller" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </motion.label>
            <div>
                <motion.form
                    onSubmit={handleSubmit(generateVisionStatement)}  
                    className="w-full mx-auto text-center rounded-lg py-6 px-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <motion.h1
                        className="text-2xl md:text-3xl lg:text-4xl flex justify-center mt-5 lg:mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 mb-4 animate-gradient"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
                    >
                        Vision Statement Generator
                    </motion.h1>
                    <motion.h2
                        className='my-5 lg:my-8 text-[10px] font-normal text-center md:text-lg lg:text-xl'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
                    >
                        Shape your organization's future. Provide your insights below to craft a vision statement that encapsulates your core values, mission, and aspirations.
                    </motion.h2>
                    {[
                        "What are your core values?",
                        "What is your mission in your industry?",
                        "What do you aspire to achieve in the long term?",
                        "What innovative approaches will you implement to stay ahead of the competition?",
                        "How do you plan to adapt to future challenges in your industry?",
                        "What impact do you want to make in your community?",
                        "What sets you apart from your competitors?",
                        "What are your primary business goals?",
                        "How do you envision your company’s culture?",
                        "How do you plan to measure success?"
                    ].map((question, index) => (
                        <motion.div
                        key={index}
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
                    >
                        <label className="block text-left my-2 text-base md:text-lg lg:text-xl">{question}</label>
                        <input
                            {...register(`question${index + 1}`, { required: "This field is required. Please provide your answer." })}  
                            className={`border-2 text-xs md:text-sm lg:text-base rounded w-full p-2 transition-all duration-300 hover:border-blue-400 transform hover:scale-105 focus:shadow-lg ${
                                errors[`question${index + 1}`] ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder={question}
                        />
                        {errors[`question${index + 1}`] && (
                            <span className="text-red-500 text-sm">{errors[`question${index + 1}`]?.message}</span>
                        )}
                    </motion.div>
                    ))}

                    <motion.div
                        className="my-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 1.1 }}
                    >
                        <label className="block text-left text-base md:text-lg lg:text-xl">Word Limit: {wordLimit}</label>
                        <input
                            type="range"
                            min="50"
                            max="500"
                            value={wordLimit}
                            onChange={(e) => setWordLimit(e.target.value)}
                            className="w-full"
                        />
                    </motion.div>

                    <motion.div
                        className="my-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 1.2 }}
                    >
                        <label className="block text-left text-base md:text-lg lg:text-xl">Line Limit: {lineLimit}</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={lineLimit}
                            onChange={(e) => setLineLimit(e.target.value)}
                            className="w-full"
                        />
                    </motion.div>

                    <motion.div
                        className=''
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 1.3 }}
                    >
                        <button
                            type="submit"
                            className={`relative bg-gradient-to-r  flex justify-center items-center gap-2 from-cyan-400 to-blue-500 text-white p-3 rounded-full my-4 mx-auto btn-wide ${generatingAnswer ? 'generating' : ''}`}
                            disabled={generatingAnswer}
                        >
                            {generatingAnswer ? (
                                <>
                                    Generating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
                                </>
                            ) : (answer ? "Regenerate" : "Generate")} <RiAiGenerate />
                        </button>
                    </motion.div>
                </motion.form>

                <motion.div
                    className="w-[350px] md:w-full lg:w-full mx-auto border-2 text-center rounded-lg my-4 text-xs md:text-sm lg:text-base shadow-lg  border-gray-400 transition-all duration-200 hover:border-blue-400 transform hover:scale-105 focus:shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    whileHover={{ scale: 1.02 }}
                >
                    {generatingAnswer ? (
                        <Loader />
                    ) : (
                        <ReactMarkdown className="p-4 md:p-6 lg:p-8 text-justify leading-5 lg:leading-7">
                            {answer}
                        </ReactMarkdown>
                    )}
                </motion.div>

            </div>
        </div>
    );
};

export default App;
