const collegeModel = require("../models/collegeModel")
const validfun = require("../validationfunction/validfun")
const nameRegex = /^[a-zA-Z_ ]*$/
const isValidName=/^[a-zA-Z]{3,9}$/
const isValidLogo=/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i

// ===========================||CREATE COLLEGE||==================

const createCollege = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink, isDeleted } = data;

        if (!data) { return res.status(400).send({ status: false, msg: "Provide Data" }) }
        
        if (!name) return res.status(400).send({ status: false, msg: "Name is required" })
        if (!fullName) return res.status(400).send({ status: false, msg: "Fullname is required" })
        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is required" })

        if (!isValidName.test(name)) return res.status(406).send({
            status: false, msg: "Enter a valid name",
            validname: "length of name in between(3-9) , you can't use any Number & Special character " })

        if (!validfun.nameValidation(name)) {
            return res.status(400).send({ status: false, msg: "Please enter name" })}
        if (!validfun.nameValidation(fullName)) {
            return res.status(400).send({ status: false, msg: "Please enter full name!!" })}
        if (!validfun.nameValidation(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please enter logoLink!!" })}
            
        if (!nameRegex.test(name)) {return res.status(400).send({ status: false, msg: "Invalid name" })}
        if (!isValidLogo.test(logoLink)) {return res.status(400).send({ status: false, msg: "Invalid logoLink url" })}

        const avlebalData=await collegeModel.find({$or:[{name:name},{fullName:fullName}]})
        if(avlebalData.length>0){return res.status(409).send({status:false,msg:"College already exists"})}

        if (isDeleted) {
            if (typeof (isDeleted) !== "boolean")
             return res.status(400).send({ status: false, msg: "isDeleted must be a Boolean value" }) }

        if (isDeleted){
            if (isDeleted===true)
             return res.status(400).send({ status: false, msg: "Provide Is deleted key must be false" }) }

        let savedData = await collegeModel.create(data);
        res.status(201).send({ status: true, data: savedData });

    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
};

// ======================================================================

module.exports.createCollege = createCollege