const UrlShortener = () => {
     return (
          <div className="url-section">
               <h2>Shorten Your URL</h2>
               <div className="url-form">
                    <input type="url" placeholder="Enter your long URL here" />
                    <button>Shorten URL</button>
               </div>
          </div>
     );
};

export default UrlShortener;