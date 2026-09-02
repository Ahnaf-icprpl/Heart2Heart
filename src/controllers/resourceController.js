/**
 * Heart2Heart - Safe Haven Toolkit & Breathing Room Controller
 */

const store = require('../data/store');

exports.getResources = (req, res) => {
  const crisisData = store.getCrisisResources();

  res.render('pages/resources', {
    title: 'Safe Haven & Crisis Support Toolkit | Heart2Heart',
    helplines: crisisData.helplines,
    groundingTechniques: crisisData.groundingTechniques
  });
};

exports.getBreathingRoom = (req, res) => {
  res.render('pages/breathing', {
    title: 'Peaceful Breathing Room | Heart2Heart'
  });
};
