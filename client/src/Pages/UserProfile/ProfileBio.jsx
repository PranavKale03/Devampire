import React from "react";

const ProfileBio = ({ currentProfile }) => {
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4 style={{color:'#b9c3d0'}}>Tags watched</h4>
            {
                currentProfile?.tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                ))
            }
          </>
        ) : (
          <p style={{color:'#b9c3d0'}}>0 tags watched</p>
        )
        }
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4 style={{color:'#b9c3d0'}}>About</h4>
            <p style={{color:'#b9c3d0'}}>{currentProfile?.about}</p>
          </>
        ) : (
          <p style={{color:'#b9c3d0'}}>No bio found</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;