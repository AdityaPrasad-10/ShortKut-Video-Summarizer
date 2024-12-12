function Footer() {
  return (
    <div className="mt-20 mx-40">
      <hr />
      <div className="flex flex-col items-center py-5">
        <p className="text-white text-base text-center">
          Made by 
        </p>

        <div className="flex justify-center space-x-10 mt-5">
          {/* Aditya Prasad Y */}
          <div className="text-white text-center">
            <p>Aditya Prasad Y</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.linkedin.com/in/aditya-prasad-ba6178314/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-linkedin"></i>
              </a>
              <a href="https://github.com/AdityaPrasad-10" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-github"></i>
              </a>
            </div>
          </div>

          {/* Akshay Rahul CM */}
          <div className="text-white text-center">
            <p>Akshay Rahul CM</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.linkedin.com/in/akshayrahulcm/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-linkedin"></i>
              </a>
              <a href="https://github.com/akshayrahulcm" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-github"></i>
              </a>
            </div>
          </div>
          {/* Deepak Bharathi M */}
          <div className="text-white text-center">
            <p>Deepak Barathi M</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.linkedin.com/in/deepakbharathim/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-linkedin"></i>
              </a>
              <a href="https://github.com/deepakbharathim" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands text-xl text-white fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
