export default interface ProjectDto {
    id: number;
    name: string;
    country: string;
    imageUrl: string;
    pricePerTon: number;
    offeredVolumeInTons: number;
    distributionWeight: number;
    supplierName: string;
    earliestDelivery: Date;
    description: string;
}