import PricingCard from '../components/PricingCard';

function Services() {
  return (
    <div className='flex flex-col gap-8 mx-8 xl:mx-36 py-32 bg-gray-50 dark:bg-gray-800'>
      <h1 className='text-4xl font-bold dark:text-white'>Services</h1>
      <div className='flex max-md:flex-col gap-4'>
        <PricingCard
          planName={'Student plan'}
          price={19}
          teamMembers={{ description: '20 matchs members', isEnabled: true }}
          cloudStorage={{ description: '2 free plan / month', isEnabled: true }}
          integrationHelp={{ description: 'Reduction for sport activities, events and equipements', isEnabled: false }}
          sketchFiles={{ description: 'Meeting with top athletes', isEnabled: false }}
          apiAccess={{ description: 'Privatisation of sports places', isEnabled: false }}
        />
        <PricingCard
          planName={'Standard plan'}
          price={49}
          teamMembers={{ description: '50 matchs members', isEnabled: true }}
          cloudStorage={{ description: '5 free plan / month', isEnabled: true }}
          integrationHelp={{ description: 'Reduction for sport activities, events and equipements', isEnabled: true }}
          sketchFiles={{ description: 'Meeting with top athletes', isEnabled: false }}
          apiAccess={{ description: 'Privatisation of sports places', isEnabled: false }}
        />
        <PricingCard
          planName={'Premium plan'}
          price={100}
          teamMembers={{ description: 'Unlimited matchs members', isEnabled: true }}
          cloudStorage={{ description: 'Unlimited plan', isEnabled: true }}
          integrationHelp={{ description: 'Reduction for sport activities, events and equipements', isEnabled: true }}
          sketchFiles={{ description: 'Meeting with top athletes', isEnabled: true }}
          apiAccess={{ description: 'Privatisation of sports places', isEnabled: true }}
        />
      </div>
    </div>
  );
}

export default Services;
