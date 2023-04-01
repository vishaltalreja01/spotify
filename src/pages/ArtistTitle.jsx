import React from "react";
 

function addSlashToCamelCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1/$2");
  }
  
  function ArtistTitle(props) {
    const { text } = props;
    const formattedText = addSlashToCamelCase(text);
    
  return (
    <div>
    
      <b>  {formattedText}</b>
    </div>
  );
}

export default ArtistTitle;
