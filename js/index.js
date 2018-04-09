var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioWidget = function () {
  function RadioWidget() {
    _classCallCheck(this, RadioWidget);

    this.stations = [{ name: 'Putin FM', frequency: '66,6', cover: 'https://www.defatoonline.com.br/wp-content/uploads/2018/03/putin.jpg?w=800%&h=400' }, { name: 'Dribbble FM', frequency: '102,1', cover: 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2015-12-15/16769299860_10d67877845c919e77d0_512.png' }, { name: 'Doge FM', frequency: '99,4', cover: 'https://t3.rbxcdn.com/abab9c91475ebf5a6c172a77e4e24708' }, { name: 'Ballads FM', frequency: '87,1', cover: 'https://t-eska.cdn.smcloud.net/common/9/6/s/964022wCiw.jpg/ru-0-r-650,0-n-964022wCiw_beatles_nowa_plyta.jpg' }, { name: 'Maximum FM', frequency: '142,2', cover: 'https://lastfm-img2.akamaized.net/i/u/ar0/e5f4caf8712f43abaea5e95879a90e47' }];
    this.playing = false;
    this.activeStation = '';
  }

  _createClass(RadioWidget, [{
    key: 'loadStations',
    value: function loadStations() {
      var stationsHolder = document.getElementsByClassName('c-radio__body');
      var renderedStations = [];

      this.stations.map(function (item) {
        renderedStations.push('\n          <div class="c-radio__station">\n            <div class="c-radio__stationBody isClosed">\n              <button class="c-radio__btn c-radio__btn--minus"></button>\n              <div class="c-radio__stationImg" style="background-image: url(\'' + item.cover + '\');"></div>\n              <button class="c-radio__btn c-radio__btn--plus"></button>\n            </div>\n            <div class="c-radio__stationHeader">\n              <div class="c-radio__stationTitle">' + item.name + '</div>\n              <div class="c-radio__stationFreq">' + item.frequency + '</div>\n            </div>\n          </div>\n        ');
      });

      stationsHolder[0].innerHTML = renderedStations.join('');
    }
  }, {
    key: 'toggleStation',
    value: function toggleStation(element) {
      var stationsBody = document.getElementsByClassName('c-radio__stationBody');
      var stationBody = void 0;

      if (element.className == 'c-radio__stationHeader') {
        stationBody = element.previousElementSibling;
      } else if (element.className == 'c-radio__stationTitle' || element.className == 'c-radio__stationFreq') {
        stationBody = element.parentElement.previousElementSibling;
      }

      for (var i = 0; i <= stationsBody.length - 1; i++) {
        if (stationsBody[i] !== stationBody) {
          stationsBody[i].classList.add('isClosed');
        }
      }

      stationBody.classList.toggle('isClosed');
    }
  }, {
    key: 'setActiveStation',
    value: function setActiveStation(element) {
      var stationTitle = void 0;

      if (element.className == 'c-radio__stationHeader') {
        stationTitle = element.firstChild.nextElementSibling.innerText;
      } else if (element.className == 'c-radio__stationTitle') {
        stationTitle = element.innerText;
      } else if (element.className == 'c-radio__stationFreq') {
        stationTitle = element.previousElementSibling.innerText;
      }

      this.activeStation = stationTitle;
    }
  }, {
    key: 'showActiveStation',
    value: function showActiveStation() {
      var stationTitleHolder = document.querySelector('.c-radio__playingNowTitle');
      var stationTitleTagHolder = document.querySelector('.c-radio__playingNowTag');

      if (this.activeStation == stationTitleHolder.innerText) {
        stationTitleHolder.innerText = '';
        stationTitleTagHolder.innerText = '';
        this.activeStation = '';
      } else {
        stationTitleHolder.innerText = this.activeStation;
        stationTitleTagHolder.innerText = 'currently playing';
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(element) {
      this.toggleStation(element);
      this.setActiveStation(element);
      this.showActiveStation();
    }
  }]);

  return RadioWidget;
}();

document.addEventListener("DOMContentLoaded", function () {
  var station = document.getElementsByClassName('c-radio__stationHeader');
  var radioOne = new RadioWidget();
  radioOne.loadStations();

  for (var i = 0; i <= station.length; i++) {
    station[i].addEventListener('click', function (e) {
      radioOne.handleClick(e.target);
    });
  }
});