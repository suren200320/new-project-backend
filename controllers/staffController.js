const StaffMember = require('../models/staffMember');
const Position = require('../models/position');
const PositionTranslation = require('../models/positionTranslation');

async function addStaffMember(firstName, lastName, avatar, positions) {
    try {
        const staffMember = await StaffMember.create({ firstName, lastName, avatar });
        await Promise.all(positions.map(async position => {
            await PositionTranslation.create({ name: position.name, language: position.language, PositionId: staffMember.id });
        }));
        return staffMember;
    } catch (error) {
        throw new Error('Error adding staff member');
    }
}

async function removeStaffMember(id) {
    try {
        await StaffMember.destroy({ where: { id } });
        return true;
    } catch (error) {
        throw new Error('Error removing staff member');
    }
}

async function editStaffMember(id, firstName, lastName, avatar) {
    try {
        const updatedStaffMember = await StaffMember.update({ firstName, lastName, avatar }, { where: { id } });
        return updatedStaffMember;
    } catch (error) {
        throw new Error('Error editing staff member');
    }
}

async function getAllStaffMembers() {
    try {
        const staffMembers = await StaffMember.findAll({ include: Position });
        return staffMembers;
    } catch (error) {
        throw new Error('Error getting all staff members');
    }
}

module.exports = { addStaffMember, removeStaffMember, editStaffMember, getAllStaffMembers };