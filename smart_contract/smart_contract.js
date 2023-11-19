function getAccountBalance(totalFunds, ADonors, BDonors, CDonors) {
    // Calculate the matching fund for each donor
    const totalDonors = ADonors + BDonors + CDonors;
    const projectA = (ADonors / totalDonors) * (totalFunds);

    const projectB = (BDonors / totalDonors) * (totalFunds);

    const projectC = (CDonors / totalDonors) * (totalFunds);


    // Calculate the total funding for the project
    // const projectFunding = matchingFund * numberOfDonors * numberOfDonors;

    return projectA, projectB, projectC;
}

// // Example usage
// const totalFundsAvailable = 10000; // Total funds available for distribution
// const numberOfDonorsForProject = 50; // Number of donors for a specific project

// const projectFunding = calculateQuadraticFunding(totalFundsAvailable, numberOfDonorsForProject);
// console.log(`The project receives $${projectFunding.toFixed(2)} based on quadratic funding.`);
