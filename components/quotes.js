import Debug from 'debug';

let debug = Debug('app.quotes');

const quotesFactory = ({ React }) => {

  const {
    string,
    array,
    func,
    bool
  } = React.PropTypes

  return function Quotes (props) {

    Quotes.propTypes = {
      imageUrl: string,
      quotes: array.isRequired,
      displayInput: bool.isRequired,

      actions: React.PropTypes.shape({
        nextQuote: func.isRequired,
        displayKey: func.isRequired,
        addQuote: func.isRequired,
        toggleInput: func.isRequired
      })
    }

    // consider this FB posts
    // https://speakerdeck.com/vjeux/react-css-in-js
    const styles = {
      quote: (key, displayKey) => {
        return key === displayKey ? 'quote visible' : 'quote hidden';
      },

      // generic
      display: (show) => {
        return {
          display: (show ? 'block' : 'none')
        }
      }
    }

    const onKeyUp = (e) => {
      if(e.key !== 'Enter') return;

      addQuote(e.target.value);
      toggleInput();
    }

    return {

      componentDidUpdate () {
        if(this.props.displayInput) {
          this.refs.inputQuote.getDOMNode().focus();
        }
      },

      render () {
        debug(this.props);

        const {
          imageUrl,
          quotes,
          displayInput
        } = this.props;

        const {
          displayKey,
          nextQuote,
          toggleInput
        } = this.props.actions;

        // return (
        //   <div className='quotes-root'>
        //     <img src={ imageUrl }></img>
        //     <div
        //       className='quote-display'
        //       style={ styles.display(!displayInput)}
        //     > {quotes.map(function(quote, key) {
        //         return (
        //           <div
        //             className={ styles.quote(key, displayKey()) }
        //             key={ key }
        //             onClick={ nextQuote }
        //           > “{ quote }”
        //           </div>
        //         );
        //       })}
        //     </div>
        //     <i
        //       className='add'

        //       onClick={ toggleInput }
        //     >+</i>
        //     <input
        //       ref='inputQuote'
        //       style={ styles.display(displayInput) }
        //       placeholder='Enter your functional zen quote'
        //       onKeyUp={ onKeyUp }/>
        //   </div>
        // );
        return (
          <div className='quotes-root'>
            <img src={ imageUrl }></img>
            <div
              className='quote-display'
              style={ styles.display(!displayInput)}
            > {quotes.map(function(quote, key) {
                return (
                  <div
                    className={ styles.quote(key, displayKey()) }
                    key={ key }
                    onClick={ nextQuote }
                  > “{ quote }”
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

    };

  }
}

export default quotesFactory;