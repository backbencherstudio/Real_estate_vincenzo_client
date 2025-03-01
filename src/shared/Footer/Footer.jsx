const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <footer className="text-center lg:mt-10 py-4 text-sm text-gray-400">
                <p>© {currentYear} Copyright - All rights reserved by Real estate</p>
            </footer>
        </div>
    );
};

export default Footer;
