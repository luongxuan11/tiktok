import React, { memo, useState, useEffect} from 'react'
import Button from '../Button';

const TextAnimated = ({setShowForm}) => {
    const [contactClass, setContactClass] = useState('contact1');
    const [text, setText] = useState('item1');
    

    useEffect(() => {
        const interval = setInterval(() => {
          setContactClass((prevClass) => {
            switch (prevClass) {
              case 'contact1':
                return 'contact2';
              case 'contact2':
                return 'contact3';
              case 'contact3':
                return 'contact1';
              default:
                return 'contact1';
            }
          });
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setText((prevClass) => {
            switch (prevClass) {
              case 'item1':
                return 'item2';
              case 'item2':
                return 'item3';
              case 'item3':
                return 'item1';
              default:
                return 'item1';
            }
          });
        }, 2000);
    
        return () => clearInterval(interval);
      }, []);

      const handleShowForm = () =>{
          setShowForm(true)
      }
  return (
    <>
        <div className="text-heading__box row">
        <span className={`${text === "item1" && text} item1-color`}>Develop.</span>
        <span className={`${text === "item2" && text} item2-color`}>Preview.</span>
        <span className={`${text === "item3" && text} item3-color`}>Tiktok.</span>
      </div>
      <p className="text-heading__content row">
        Welcome to our platform! This website is dedicated to providing educational content. Thank you very much.
      </p>
      <div className="text-heading__btn row">
        <Button onClick={handleShowForm} text="Sign up" btnClass={'login'} />
        <Button text="Contact" btnClass={contactClass} />
      </div>
    </>
  )
}

export default memo(TextAnimated)