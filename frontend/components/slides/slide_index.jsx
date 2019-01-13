import React from 'react';
import SlideDetail from '../slides/slide_detail';
import SlideNotes from '../slides/slide_notes';

class SlideIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
  }

  currentSlide() {
    return this.props.slides[this.props.slideIndex];
  }

  handleKeyPress(e) {
    switch (e.key) {
      case "PageUp":
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        this.slideLeft();
        break;

      case "PageDown":
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        this.slideRight();
        break;

      case "Home":
        e.preventDefault();
        this.props.updateSlideIndex(0);
        break;

      case "End":
        e.preventDefault();
        this.props.updateSlideIndex(this.props.slides.length - 1);
        break;
    }
  }

  slideLeft() {
    if (this.props.slideIndex > 0) {
      this.props.updateSlideIndex(this.props.slideIndex - 1);
    }
  }

  slideRight() {
    if (this.props.slideIndex < this.props.slides.length - 1) {
      this.props.updateSlideIndex(this.props.slideIndex + 1);
    }
  }

  render() {
    return (
      <div className="slide-index" onKeyDown={this.handleKeyPress}>
        <ul className="slides">
          {this.props.slides.map((slide, i) => (
            <SlideDetail
              key={i} slide={slide}
              selected={i === this.props.slideIndex}
              onClick={this.props.updateSlideIndex.bind(null, i)} />
          ))}
        </ul>
        <SlideNotes slide={this.currentSlide()} />
      </div>
    );
  }
}

export default SlideIndex;
