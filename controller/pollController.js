const Poll = require('../schema/poll');

exports.createPollGetController = (req, res, next) => {
    res.render('create');
}

exports.createPollPostController = async (req, res, next) => {
    let { title, description, options} = req.body;

    options = options.map(option => {
        return {
            name: option,
            vote: 0
        }
    })

    //here we create document
    let poll = new Poll({
        title,
        description,
        options
    })

    try {
        await poll.save()
        res.redirect('/polls')

    } catch (e) {
        console.log(e)
    }

    //console.log(options)

    res.render('create');
}

exports.getallPolls = async (req, res, next) => {
    try{
        let polls = await Poll.find()
        res.render('polls', {polls})
    } catch (e) {
        console.log(e);
    }
}

exports.viewPollGetController = async (req, res, next) => {
    let id = req.params.id;

    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]

        let result = []
        options.forEach(option => {
            let percentage = (option.vote * 100) / poll.totalvote
            result.push({
                ...option._doc,
                percentage: percentage ? percentage: 0
            })
        })

        res.render('viewPoll', {poll, result})

    } catch (e) {
        console.log(e)
    }
}

exports.viewPollPostController = async (req, res, next) => {
    let id = req.params.id
    let optionId = req.body.option
    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]
        
        let index = options.findIndex(oo => oo.id === optionId)
        options[index].vote = options[index].vote + 1

        let totalvote = poll.totalvote + 1

        await Poll.findOneAndUpdate(
            {_id: poll._id},
            {$set: {options, totalvote}}
        )

        res.redirect('/polls/' + id)

    } catch (e) {
        console.log(e)
    }
}